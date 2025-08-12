#!/usr/bin/env node

/**
 * Lighthouse Reporter Script for Dr. Hamann Website
 * Generates comprehensive reports from lighthouse monitoring data
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  dataDir: path.resolve(__dirname, '../monitoring/data'),
  reportsDir: path.resolve(__dirname, '../monitoring/reports'),
  dataFile: 'lighthouse-history.json'
};

class LighthouseReporter {
  constructor() {
    this.dataFile = path.join(CONFIG.dataDir, CONFIG.dataFile);
    this.reportsDir = CONFIG.reportsDir;
  }

  async ensureReportsDirectory() {
    try {
      await fs.access(this.reportsDir);
    } catch {
      await fs.mkdir(this.reportsDir, { recursive: true });
    }
  }

  async loadHistory() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ No monitoring data found. Run `npm run monitor` first.');
      process.exit(1);
    }
  }

  filterRunsByPeriod(runs, period) {
    const now = new Date();
    const cutoffDate = new Date();

    switch (period) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return runs; // Return all runs
    }

    return runs.filter(run => new Date(run.timestamp) >= cutoffDate);
  }

  calculateStatistics(runs) {
    if (runs.length === 0) return null;

    const latest = runs[runs.length - 1];
    const oldest = runs[0];
    
    const stats = {
      totalRuns: runs.length,
      dateRange: {
        from: new Date(oldest.timestamp).toLocaleDateString('de-DE'),
        to: new Date(latest.timestamp).toLocaleDateString('de-DE')
      },
      scores: {},
      metrics: {}
    };

    // Calculate score statistics
    const categories = ['performance', 'accessibility', 'bestPractices', 'seo'];
    categories.forEach(category => {
      const scores = runs.map(run => run.scores[category]).filter(score => score != null);
      if (scores.length > 0) {
        stats.scores[category] = {
          current: latest.scores[category],
          average: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
          min: Math.min(...scores),
          max: Math.max(...scores),
          trend: latest.scores[category] - oldest.scores[category]
        };
      }
    });

    // Calculate metrics statistics
    const metricKeys = ['firstContentfulPaint', 'largestContentfulPaint', 'cumulativeLayoutShift', 'speedIndex'];
    metricKeys.forEach(metric => {
      const values = runs.map(run => run.metrics[metric]).filter(val => val != null);
      if (values.length > 0) {
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        stats.metrics[metric] = {
          current: latest.metrics[metric],
          average: metric === 'cumulativeLayoutShift' ? parseFloat(avg.toFixed(3)) : Math.round(avg),
          min: Math.min(...values),
          max: Math.max(...values),
          trend: latest.metrics[metric] - oldest.metrics[metric]
        };
      }
    });

    return stats;
  }

  generateConsoleReport(runs, period = 'all') {
    const filteredRuns = this.filterRunsByPeriod(runs, period);
    const stats = this.calculateStatistics(filteredRuns);

    if (!stats) {
      console.log('❌ No data available for the specified period.');
      return;
    }

    console.log(`\n📈 LIGHTHOUSE REPORT - ${period.toUpperCase()}`);
    console.log('═'.repeat(60));
    console.log(`📊 Total Runs: ${stats.totalRuns}`);
    console.log(`📅 Period: ${stats.dateRange.from} - ${stats.dateRange.to}`);

    console.log('\n🎯 SCORES SUMMARY:');
    console.log('─'.repeat(50));
    Object.entries(stats.scores).forEach(([category, data]) => {
      const categoryName = category.replace(/([A-Z])/g, ' $1').toLowerCase();
      const capitalizedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      const trendEmoji = data.trend > 0 ? '📈' : data.trend < 0 ? '📉' : '➡️';
      const scoreEmoji = data.current >= 90 ? '🟢' : data.current >= 50 ? '🟡' : '🔴';
      
      console.log(`${scoreEmoji} ${capitalizedName}:`);
      console.log(`   Current: ${data.current}/100 | Average: ${data.average}/100`);
      console.log(`   Range: ${data.min}-${data.max} | Trend: ${trendEmoji} ${data.trend > 0 ? '+' : ''}${data.trend}`);
    });

    console.log('\n⚡ CORE WEB VITALS SUMMARY:');
    console.log('─'.repeat(50));
    
    const vitalLabels = {
      firstContentfulPaint: 'First Contentful Paint (ms)',
      largestContentfulPaint: 'Largest Contentful Paint (ms)',
      cumulativeLayoutShift: 'Cumulative Layout Shift',
      speedIndex: 'Speed Index (ms)'
    };

    Object.entries(stats.metrics).forEach(([metric, data]) => {
      if (vitalLabels[metric]) {
        const trendEmoji = data.trend < 0 ? '📈' : data.trend > 0 ? '📉' : '➡️';
        const unit = metric === 'cumulativeLayoutShift' ? '' : 'ms';
        const current = metric === 'cumulativeLayoutShift' ? data.current.toFixed(3) : Math.round(data.current);
        const average = metric === 'cumulativeLayoutShift' ? data.average.toFixed(3) : Math.round(data.average);
        
        console.log(`📊 ${vitalLabels[metric]}:`);
        console.log(`   Current: ${current}${unit} | Average: ${average}${unit}`);
        console.log(`   Trend: ${trendEmoji} ${data.trend > 0 ? '+' : ''}${Math.round(data.trend * 1000) / 1000}${unit}`);
      }
    });

    // Performance insights
    const perfScore = stats.scores.performance;
    if (perfScore) {
      console.log('\n💡 PERFORMANCE INSIGHTS:');
      console.log('─'.repeat(50));
      
      if (perfScore.current >= 90) {
        console.log('🎉 Excellent performance! Your site is in the top tier.');
      } else if (perfScore.current >= 70) {
        console.log('👍 Good performance, but there\'s room for improvement.');
      } else {
        console.log('⚠️  Performance needs attention. Consider optimization strategies.');
      }

      if (perfScore.trend > 5) {
        console.log('📈 Performance is trending upward - great work!');
      } else if (perfScore.trend < -5) {
        console.log('📉 Performance is declining - investigate recent changes.');
      }
    }
  }

  async generateMarkdownReport(runs, period = 'all') {
    const filteredRuns = this.filterRunsByPeriod(runs, period);
    const stats = this.calculateStatistics(filteredRuns);

    if (!stats) {
      console.log('❌ No data available for the specified period.');
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `lighthouse-report-${period}-${timestamp}.md`;
    const filepath = path.join(this.reportsDir, filename);

    let markdown = `# Lighthouse Performance Report - ${period.toUpperCase()}

Generated: ${new Date().toLocaleString('de-DE')}
Website: https://dkause-recherche-dienste-hamann.statichost.eu/

## Summary

- **Total Runs**: ${stats.totalRuns}
- **Period**: ${stats.dateRange.from} - ${stats.dateRange.to}

## Scores Overview

| Category | Current | Average | Min | Max | Trend |
|----------|---------|---------|-----|-----|--------|
`;

    Object.entries(stats.scores).forEach(([category, data]) => {
      const categoryName = category.replace(/([A-Z])/g, ' $1');
      const capitalizedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      const trendEmoji = data.trend > 0 ? '📈' : data.trend < 0 ? '📉' : '➡️';
      
      markdown += `| ${capitalizedName} | ${data.current}/100 | ${data.average}/100 | ${data.min}/100 | ${data.max}/100 | ${trendEmoji} ${data.trend > 0 ? '+' : ''}${data.trend} |\n`;
    });

    markdown += `\n## Core Web Vitals

| Metric | Current | Average | Trend |
|--------|---------|---------|-------|
`;

    const vitalLabels = {
      firstContentfulPaint: 'First Contentful Paint (ms)',
      largestContentfulPaint: 'Largest Contentful Paint (ms)',
      cumulativeLayoutShift: 'Cumulative Layout Shift',
      speedIndex: 'Speed Index (ms)'
    };

    Object.entries(stats.metrics).forEach(([metric, data]) => {
      if (vitalLabels[metric]) {
        const trendEmoji = data.trend < 0 ? '📈' : data.trend > 0 ? '📉' : '➡️';
        const unit = metric === 'cumulativeLayoutShift' ? '' : 'ms';
        const current = metric === 'cumulativeLayoutShift' ? data.current.toFixed(3) : Math.round(data.current);
        const average = metric === 'cumulativeLayoutShift' ? data.average.toFixed(3) : Math.round(data.average);
        
        markdown += `| ${vitalLabels[metric]} | ${current}${unit} | ${average}${unit} | ${trendEmoji} ${data.trend > 0 ? '+' : ''}${Math.round(data.trend * 1000) / 1000}${unit} |\n`;
      }
    });

    // Add insights section
    const perfScore = stats.scores.performance;
    markdown += `\n## Performance Insights

`;

    if (perfScore) {
      if (perfScore.current >= 90) {
        markdown += '🎉 **Excellent performance!** Your site is in the top tier.\n\n';
      } else if (perfScore.current >= 70) {
        markdown += '👍 **Good performance**, but there\'s room for improvement.\n\n';
      } else {
        markdown += '⚠️ **Performance needs attention.** Consider optimization strategies.\n\n';
      }

      if (perfScore.trend > 5) {
        markdown += '📈 **Performance is trending upward** - great work!\n\n';
      } else if (perfScore.trend < -5) {
        markdown += '📉 **Performance is declining** - investigate recent changes.\n\n';
      }
    }

    // Recent improvements or issues
    if (filteredRuns.length >= 2) {
      const recent = filteredRuns.slice(-5); // Last 5 runs
      markdown += `## Recent Activity (Last ${Math.min(5, recent.length)} runs)

| Date | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
`;
      
      recent.forEach(run => {
        markdown += `| ${run.date} | ${run.scores.performance}/100 | ${run.scores.accessibility}/100 | ${run.scores.bestPractices}/100 | ${run.scores.seo}/100 |\n`;
      });
    }

    markdown += `\n## Recommendations

### Performance Optimization
- Monitor Core Web Vitals regularly
- Optimize images and assets
- Minimize render-blocking resources
- Use efficient caching strategies

### Accessibility
- Ensure proper heading structure
- Maintain sufficient color contrast
- Add alt text to all images
- Test with screen readers

### Best Practices
- Use HTTPS everywhere
- Keep dependencies updated
- Implement proper error handling
- Follow modern web standards

### SEO
- Optimize meta descriptions
- Use structured data
- Ensure mobile-friendliness
- Improve page loading speed

---

*Report generated by Lighthouse Monitoring System*
`;

    await fs.writeFile(filepath, markdown);
    console.log(`📄 Markdown report saved to: ${filepath}`);
    return filepath;
  }

  async generateCSVExport(runs, period = 'all') {
    const filteredRuns = this.filterRunsByPeriod(runs, period);
    
    if (filteredRuns.length === 0) {
      console.log('❌ No data available for the specified period.');
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `lighthouse-data-${period}-${timestamp}.csv`;
    const filepath = path.join(this.reportsDir, filename);

    // CSV header
    let csv = 'Date,Time,Performance,Accessibility,Best Practices,SEO,FCP,LCP,CLS,Speed Index,TBT,TTI\n';

    filteredRuns.forEach(run => {
      csv += [
        run.date,
        run.time,
        run.scores.performance,
        run.scores.accessibility,
        run.scores.bestPractices,
        run.scores.seo,
        Math.round(run.metrics.firstContentfulPaint),
        Math.round(run.metrics.largestContentfulPaint),
        run.metrics.cumulativeLayoutShift.toFixed(3),
        Math.round(run.metrics.speedIndex),
        Math.round(run.metrics.totalBlockingTime),
        Math.round(run.metrics.timeToInteractive)
      ].join(',') + '\n';
    });

    await fs.writeFile(filepath, csv);
    console.log(`📊 CSV data exported to: ${filepath}`);
    return filepath;
  }

  async run(options = {}) {
    try {
      await this.ensureReportsDirectory();
      const history = await this.loadHistory();
      const runs = history.runs || [];

      if (runs.length === 0) {
        console.log('❌ No monitoring data found. Run `npm run monitor` first.');
        return;
      }

      const { format = 'console', period = 'all' } = options;

      switch (format) {
        case 'markdown':
        case 'md':
          await this.generateMarkdownReport(runs, period);
          break;
        case 'csv':
          await this.generateCSVExport(runs, period);
          break;
        case 'all':
          this.generateConsoleReport(runs, period);
          await this.generateMarkdownReport(runs, period);
          await this.generateCSVExport(runs, period);
          break;
        default:
          this.generateConsoleReport(runs, period);
      }

    } catch (error) {
      console.error('❌ Error generating report:', error.message);
      process.exit(1);
    }
  }
}

// Command line interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const format = args.find(arg => ['console', 'markdown', 'md', 'csv', 'all'].includes(arg)) || 'console';
  const period = args.find(arg => ['week', 'month', 'quarter', 'year', 'all'].includes(arg)) || 'all';

  const reporter = new LighthouseReporter();
  reporter.run({ format, period });
}

export default LighthouseReporter;