#!/usr/bin/env node

/**
 * Lighthouse Monitoring Script for Dr. Hamann Website
 * Automatically runs Lighthouse tests and stores results with timestamps
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  url: 'https://dkause-recherche-dienste-hamann.statichost.eu/',
  dataDir: path.resolve(__dirname, '../monitoring/data'),
  chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  lighthouseConfig: {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      emulatedFormFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      },
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false
      }
    }
  }
};

class LighthouseMonitor {
  constructor() {
    this.dataFile = path.join(CONFIG.dataDir, 'lighthouse-history.json');
  }

  async ensureDataDirectory() {
    try {
      await fs.access(CONFIG.dataDir);
    } catch {
      await fs.mkdir(CONFIG.dataDir, { recursive: true });
    }
  }

  async loadHistory() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf-8');
      return JSON.parse(data);
    } catch {
      return { runs: [] };
    }
  }

  async saveHistory(history) {
    await fs.writeFile(this.dataFile, JSON.stringify(history, null, 2));
  }

  async runLighthouse() {
    console.log(`\n🚀 Starting Lighthouse audit for: ${CONFIG.url}`);
    console.log('⏳ This may take 30-60 seconds...\n');

    let chrome;
    try {
      // Launch Chrome
      chrome = await chromeLauncher.launch({
        chromeFlags: CONFIG.chromeFlags
      });

      // Run Lighthouse
      const result = await lighthouse(CONFIG.url, {
        port: chrome.port,
        ...CONFIG.lighthouseConfig
      });

      return result;
    } finally {
      if (chrome) {
        await chrome.kill();
      }
    }
  }

  extractMetrics(lhr) {
    const timestamp = new Date().toISOString();
    const date = new Date().toLocaleDateString('de-DE');
    const time = new Date().toLocaleTimeString('de-DE');

    // Core scores
    const scores = {
      performance: Math.round((lhr.categories.performance?.score || 0) * 100),
      accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
      seo: Math.round((lhr.categories.seo?.score || 0) * 100)
    };

    // Core Web Vitals & Performance metrics
    const metrics = {
      firstContentfulPaint: lhr.audits['first-contentful-paint']?.numericValue || 0,
      largestContentfulPaint: lhr.audits['largest-contentful-paint']?.numericValue || 0,
      cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
      speedIndex: lhr.audits['speed-index']?.numericValue || 0,
      totalBlockingTime: lhr.audits['total-blocking-time']?.numericValue || 0,
      timeToInteractive: lhr.audits['interactive']?.numericValue || 0
    };

    // Key opportunities (performance improvements)
    const opportunities = [];
    Object.entries(lhr.audits).forEach(([key, audit]) => {
      if (audit.details?.type === 'opportunity' && audit.numericValue > 150) {
        opportunities.push({
          id: key,
          title: audit.title,
          description: audit.description,
          savings: Math.round(audit.numericValue),
          score: audit.score
        });
      }
    });

    // Accessibility issues
    const accessibilityIssues = [];
    Object.entries(lhr.audits).forEach(([key, audit]) => {
      if (lhr.categories.accessibility.auditRefs.some(ref => ref.id === key) && 
          audit.score !== null && audit.score < 1) {
        accessibilityIssues.push({
          id: key,
          title: audit.title,
          description: audit.description,
          score: audit.score
        });
      }
    });

    return {
      timestamp,
      date,
      time,
      url: CONFIG.url,
      scores,
      metrics,
      opportunities: opportunities.slice(0, 5), // Top 5 opportunities
      accessibilityIssues: accessibilityIssues.slice(0, 5), // Top 5 issues
      lighthouseVersion: lhr.lighthouseVersion
    };
  }

  calculateTrends(history, currentRun) {
    if (history.runs.length === 0) return null;

    const lastRun = history.runs[history.runs.length - 1];
    const trends = {};

    // Calculate score changes
    Object.keys(currentRun.scores).forEach(category => {
      const current = currentRun.scores[category];
      const previous = lastRun.scores[category];
      const change = current - previous;
      
      trends[category] = {
        current,
        previous,
        change,
        trend: change > 0 ? '📈' : change < 0 ? '📉' : '➡️'
      };
    });

    // Calculate metric changes (for core web vitals)
    const metricTrends = {};
    Object.keys(currentRun.metrics).forEach(metric => {
      const current = currentRun.metrics[metric];
      const previous = lastRun.metrics[metric];
      const change = current - previous;
      
      metricTrends[metric] = {
        current,
        previous,
        change,
        trend: change < 0 ? '📈' : change > 0 ? '📉' : '➡️' // Inverted for metrics (lower is better)
      };
    });

    return { scores: trends, metrics: metricTrends };
  }

  displayResults(data, trends) {
    console.log('✅ Lighthouse audit completed!\n');
    
    console.log('📊 SCORES:');
    console.log('─'.repeat(50));
    Object.entries(data.scores).forEach(([category, score]) => {
      const categoryName = category.replace(/([A-Z])/g, ' $1').toLowerCase();
      const capitalizedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
      const trendInfo = trends ? ` (${trends.scores[category].trend} ${trends.scores[category].change > 0 ? '+' : ''}${trends.scores[category].change})` : '';
      console.log(`${emoji} ${capitalizedName}: ${score}/100${trendInfo}`);
    });

    console.log('\n⚡ CORE WEB VITALS:');
    console.log('─'.repeat(50));
    const vitals = [
      { key: 'firstContentfulPaint', name: 'First Contentful Paint', unit: 'ms', threshold: 1800 },
      { key: 'largestContentfulPaint', name: 'Largest Contentful Paint', unit: 'ms', threshold: 2500 },
      { key: 'cumulativeLayoutShift', name: 'Cumulative Layout Shift', unit: '', threshold: 0.1 },
      { key: 'speedIndex', name: 'Speed Index', unit: 'ms', threshold: 3400 }
    ];

    vitals.forEach(({ key, name, unit, threshold }) => {
      const value = data.metrics[key];
      const formattedValue = key === 'cumulativeLayoutShift' ? value.toFixed(3) : Math.round(value);
      const emoji = value <= threshold ? '🟢' : value <= threshold * 1.5 ? '🟡' : '🔴';
      const trendInfo = trends ? ` (${trends.metrics[key].trend})` : '';
      console.log(`${emoji} ${name}: ${formattedValue}${unit}${trendInfo}`);
    });

    if (data.opportunities.length > 0) {
      console.log('\n🚀 TOP OPPORTUNITIES:');
      console.log('─'.repeat(50));
      data.opportunities.forEach((opp, index) => {
        console.log(`${index + 1}. ${opp.title} (${opp.savings}ms savings)`);
      });
    }

    if (data.accessibilityIssues.length > 0) {
      console.log('\n♿ ACCESSIBILITY ISSUES:');
      console.log('─'.repeat(50));
      data.accessibilityIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.title}`);
      });
    }

    console.log(`\n📅 Audit completed at: ${data.date} ${data.time}`);
    console.log(`📍 Data saved to: ${this.dataFile}`);
  }

  async run() {
    try {
      await this.ensureDataDirectory();
      
      // Run Lighthouse audit
      const result = await this.runLighthouse();
      
      // Extract metrics
      const data = this.extractMetrics(result.lhr);
      
      // Load history and calculate trends
      const history = await this.loadHistory();
      const trends = this.calculateTrends(history, data);
      
      // Save new data
      history.runs.push(data);
      
      // Keep only last 100 runs to prevent file from getting too large
      if (history.runs.length > 100) {
        history.runs = history.runs.slice(-100);
      }
      
      await this.saveHistory(history);
      
      // Display results
      this.displayResults(data, trends);
      
      // Alert for significant degradations
      if (trends) {
        const significantDegradations = Object.entries(trends.scores)
          .filter(([_, trend]) => trend.change <= -10)
          .map(([category, trend]) => ({ category, change: trend.change }));
          
        if (significantDegradations.length > 0) {
          console.log('\n⚠️  PERFORMANCE ALERT:');
          console.log('─'.repeat(50));
          significantDegradations.forEach(({ category, change }) => {
            console.log(`🔴 ${category} dropped by ${Math.abs(change)} points`);
          });
          console.log('\nConsider investigating recent changes that might have caused this regression.');
        }
      }
      
      console.log('\n✨ Monitoring complete!');
      
    } catch (error) {
      console.error('❌ Error running Lighthouse monitor:', error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new LighthouseMonitor();
  monitor.run();
}

export default LighthouseMonitor;