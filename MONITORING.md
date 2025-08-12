# Lighthouse Monitoring System

A comprehensive monitoring solution for tracking Lighthouse scores and UX improvements for the Dr. Hamann website at https://dkause-recherche-dienste-hamann.statichost.eu/

## Quick Start

### 1. Run a Lighthouse Audit
```bash
npm run monitor
```

### 2. View Performance Report
```bash
npm run report
```

### 3. Generate Reports
```bash
npm run report:markdown    # Generate Markdown report
npm run report:csv        # Export data to CSV
npm run report:all        # Generate all report formats
```

## Features

### 📊 Automated Lighthouse Testing
- Performance, Accessibility, Best Practices, SEO scoring
- Core Web Vitals tracking (FCP, LCP, CLS, Speed Index)
- Desktop configuration optimized for target audience
- Automatic Chrome instance management

### 📈 Trend Analysis
- Historical score tracking with timestamps
- Performance degradation alerts
- Visual trend indicators (📈📉➡️)
- Comparison with previous runs

### 📋 Multiple Report Formats
- **Console**: Quick overview with colored indicators
- **Markdown**: Detailed reports with recommendations
- **CSV**: Raw data export for external analysis

### 🎯 Smart Insights
- Top 5 performance optimization opportunities
- Key accessibility issues identification
- Performance category recommendations
- Automated alert system for score drops >10 points

## Commands

### Core Commands

```bash
# Run Lighthouse audit and store results
npm run monitor

# Display console report for all data
npm run report

# Generate weekly performance report
npm run report:week

# Generate monthly performance report  
npm run report:month

# Create detailed Markdown report
npm run report:markdown

# Export data to CSV format
npm run report:csv

# Generate all report formats
npm run report:all
```

### Time Periods
- `all` - All historical data (default)
- `week` - Last 7 days
- `month` - Last 30 days
- `quarter` - Last 3 months
- `year` - Last 12 months

## Understanding the Results

### Score Categories
- 🟢 **90-100**: Excellent
- 🟡 **50-89**: Needs improvement
- 🔴 **0-49**: Poor

### Core Web Vitals Thresholds
- **First Contentful Paint**: < 1.8s (good)
- **Largest Contentful Paint**: < 2.5s (good)
- **Cumulative Layout Shift**: < 0.1 (good)
- **Speed Index**: < 3.4s (good)

### Trend Indicators
- 📈 Improving performance
- 📉 Declining performance
- ➡️ No significant change

## File Structure

```
monitoring/
├── data/
│   └── lighthouse-history.json    # Historical audit data
└── reports/
    ├── lighthouse-report-*.md     # Generated Markdown reports
    └── lighthouse-data-*.csv      # Exported CSV data

scripts/
├── lighthouse-monitor.js          # Main monitoring script
└── lighthouse-reporter.js         # Report generation script
```

## Data Storage

### Lighthouse History Format
```json
{
  "runs": [
    {
      "timestamp": "2024-01-15T10:30:00.000Z",
      "date": "15.01.2024",
      "time": "10:30:00",
      "url": "https://dkause-recherche-dienste-hamann.statichost.eu/",
      "scores": {
        "performance": 95,
        "accessibility": 100,
        "bestPractices": 92,
        "seo": 100
      },
      "metrics": {
        "firstContentfulPaint": 1200,
        "largestContentfulPaint": 2100,
        "cumulativeLayoutShift": 0.05,
        "speedIndex": 2800,
        "totalBlockingTime": 150,
        "timeToInteractive": 3200
      },
      "opportunities": [...],
      "accessibilityIssues": [...],
      "lighthouseVersion": "12.8.1"
    }
  ]
}
```

## Automation Options

### Daily Monitoring (Manual)
```bash
# Add to daily workflow
npm run monitor && npm run report:week
```

### Weekly Reporting (Manual)
```bash
# Generate comprehensive weekly report
npm run monitor && npm run report:markdown week
```

### CI/CD Integration (Future)
For automated monitoring in CI/CD pipelines, add to your workflow:

```yaml
# GitHub Actions example
- name: Run Lighthouse Monitoring
  run: |
    npm install
    npm run monitor
    npm run report:markdown
```

## Performance Recommendations

### For Target Audience (45+ Academics)
1. **Prioritize Accessibility**: Maintain 100/100 accessibility score
2. **Optimize Loading Speed**: Target <2s load times
3. **Ensure Text Legibility**: Monitor contrast ratios
4. **Mobile Experience**: Test on various devices

### Common Optimizations
1. **Image Optimization**
   - Use WebP format where supported
   - Implement proper sizing and lazy loading
   - Optimize alt text for screen readers

2. **CSS Performance**
   - Minimize render-blocking resources
   - Use efficient layout methods (CSS Grid/Flexbox)
   - Optimize font loading

3. **JavaScript Optimization**
   - Minimize blocking scripts
   - Use code splitting for large applications
   - Optimize third-party scripts

## Troubleshooting

### Common Issues

**Error: Chrome failed to launch**
```bash
# On Linux, you may need to install Chrome dependencies
sudo apt-get install -y wget gnupg
```

**Error: No monitoring data found**
```bash
# Run an audit first
npm run monitor
```

**Error: Permission denied**
```bash
# Make scripts executable
chmod +x scripts/*.js
```

### Data Management

**Too much historical data (>100 runs)**
The system automatically keeps only the last 100 runs to prevent the data file from becoming too large.

**Reset monitoring data**
```bash
rm monitoring/data/lighthouse-history.json
```

**Backup monitoring data**
```bash
cp monitoring/data/lighthouse-history.json monitoring/data/backup-$(date +%Y%m%d).json
```

## Best Practices

### Regular Monitoring Schedule
- **Daily**: During development periods
- **Weekly**: For production monitoring
- **Before deployments**: Always run audit before publishing changes
- **After major changes**: Monitor for performance regressions

### Report Analysis
1. **Focus on Trends**: Single scores can vary; look for patterns
2. **Investigate Sudden Drops**: Score drops >10 points need attention
3. **Monitor Core Web Vitals**: These directly impact user experience
4. **Review Accessibility**: Critical for your target demographic

### Performance Budget
Consider setting performance budgets:
- Performance Score: >90
- Accessibility Score: 100 (non-negotiable)
- Best Practices Score: >90
- SEO Score: >95
- LCP: <2.5s
- FCP: <1.8s
- CLS: <0.1

## Integration with Development Workflow

### Pre-Deployment Checklist
1. Run `npm run monitor`
2. Check all scores are within acceptable ranges
3. Review any new accessibility issues
4. Generate report for documentation: `npm run report:markdown`

### Post-Deployment Verification
1. Wait 5-10 minutes after deployment
2. Run `npm run monitor`
3. Compare with pre-deployment scores
4. Investigate any performance regressions

## Support

### Getting Help
- Check the console output for detailed error messages
- Review the generated reports for performance insights
- Monitor trends over time rather than individual scores

### Updating the System
The monitoring scripts are designed to be maintenance-free, but you can:
- Update Lighthouse: `npm update lighthouse`
- Modify thresholds in the scripts as needed
- Customize report formats

---

**Remember**: Performance monitoring is most valuable when done consistently over time. Regular audits help identify trends and catch regressions early.