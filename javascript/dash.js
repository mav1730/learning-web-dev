// ==================== STAT CARD CLASS ====================
class StatCard {
    constructor(title, value, change, icon, isPositive) {
        this.title = title;
        this.value = value;
        this.change = change;
        this.icon = icon;
        this.isPositive = isPositive;
    }

    render() {
        const changeClass = this.isPositive ? 'positive' : 'negative';
        const changeIcon = this.isPositive ? '↑' : '↓';
        
        return `
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">${this.title}</span>
                    <span class="stat-card-icon">${this.icon}</span>
                </div>
                <div class="stat-card-value">${this.value}</div>
                <div class="stat-card-change ${changeClass}">
                    <span>${changeIcon}</span>
                    <span>${this.change}% from last month</span>
                </div>
            </div>
        `;
    }
}

// ==================== TRANSACTION CLASS ====================
class Transaction {
    constructor(id, customer, amount, status, date) {
        this.id = id;
        this.customer = customer;
        this.amount = amount;
        this.status = status;
        this.date = date;
    }

    render() {
        let statusClass = '';
        if (this.status === 'Completed') statusClass = 'completed';
        else if (this.status === 'Pending') statusClass = 'pending';
        else if (this.status === 'Failed') statusClass = 'failed';

        return `
            <tr>
                <td>#${this.id}</td>
                <td>${this.customer}</td>
                <td>$${this.amount.toFixed(2)}</td>
                <td><span class="status-badge ${statusClass}">${this.status}</span></td>
                <td>${this.date}</td>
            </tr>
        `;
    }
}

// ==================== CHART CLASS ====================
class Chart {
    constructor(canvasId, type) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.type = type;
    }

    drawBarChart(data, labels) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barWidth = width / data.length;
        const maxValue = Math.max(...data);

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw bars
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * (height - 40);
            const x = index * barWidth + 10;
            const y = height - barHeight - 20;

            // Gradient for bars
            const gradient = this.ctx.createLinearGradient(0, y, 0, height);
            gradient.addColorStop(0, '#6adb28ff');
            gradient.addColorStop(1, '#970e20ff');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, barWidth - 20, barHeight);

            // Draw labels
            this.ctx.fillStyle = '#666';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(labels[index], x + (barWidth - 20) / 2, height - 5);
            
            // Draw values
            this.ctx.fillStyle = '#333';
            this.ctx.fillText('$' + value, x + (barWidth - 20) / 2, y - 5);
        });
    }

    drawLineChart(data, labels) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const maxValue = Math.max(...data);
        const stepX = width / (data.length - 1);

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw line
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 3;

        data.forEach((value, index) => {
            const x = index * stepX;
            const y = height - 30 - ((value / maxValue) * (height - 60));

            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            // Draw points
            this.ctx.fillStyle = '#764ba2';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.stroke();

        // Draw labels
        labels.forEach((label, index) => {
            const x = index * stepX;
            this.ctx.fillStyle = '#666';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(label, x, height - 10);
        });
    }
}

// ==================== DASHBOARD CLASS ====================
class Dashboard {
    constructor() {
        this.stats = [];
        this.transactions = [];
        this.charts = [];
    }

    addStatCard(card) {
        this.stats.push(card);
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    addChart(chart) {
        this.charts.push(chart);
    }

    renderStats() {
        const container = document.getElementById('statsContainer');
        container.innerHTML = this.stats.map(stat => stat.render()).join('');
    }

    renderTransactions() {
        const tbody = document.querySelector('#transactionsTable tbody');
        tbody.innerHTML = this.transactions.map(transaction => transaction.render()).join('');
    }

    renderCharts() {
        this.charts.forEach(chart => {
            if (chart.type === 'bar') {
                chart.drawBarChart(
                    [4500, 5200, 4800, 6100, 5800, 6500],
                    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                );
            } else if (chart.type === 'line') {
                chart.drawLineChart(
                    [120, 150, 180, 160, 200, 190],
                    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                );
            }
        });
    }

    init() {
        this.renderStats();
        this.renderTransactions();
        this.renderCharts();
    }
}

// ==================== INITIALIZE DASHBOARD ====================
document.addEventListener('DOMContentLoaded', function() {
    const dashboard = new Dashboard();

    // Add stat cards
    dashboard.addStatCard(new StatCard('Total Revenue', '$45,231', 12.5, '💰', true));
    dashboard.addStatCard(new StatCard('New Users', '2,345', 8.3, '👥', true));
    dashboard.addStatCard(new StatCard('Orders', '1,234', -3.2, '📦', false));
    dashboard.addStatCard(new StatCard('Conversion Rate', '3.24%', 5.1, '📈', true));

    // Add transactions
    dashboard.addTransaction(new Transaction('12401', 'John Doe', 1250.00, 'Completed', '2024-12-28'));
    dashboard.addTransaction(new Transaction('12402', 'Jane Smith', 890.50, 'Pending', '2024-12-28'));
    dashboard.addTransaction(new Transaction('12403', 'Bob Johnson', 2340.00, 'Completed', '2024-12-27'));
    dashboard.addTransaction(new Transaction('12404', 'Alice Brown', 567.25, 'Failed', '2024-12-27'));
    dashboard.addTransaction(new Transaction('12405', 'Charlie Wilson', 1890.00, 'Completed', '2024-12-26'));

    // Add charts
    const revenueChart = new Chart('revenueChart', 'bar');
    revenueChart.canvas.width = 600;
    revenueChart.canvas.height = 250;
    dashboard.addChart(revenueChart);

    const activityChart = new Chart('activityChart', 'line');
    activityChart.canvas.width = 600;
    activityChart.canvas.height = 250;
    dashboard.addChart(activityChart);

    // Initialize everything
    dashboard.init();

    // Add interactivity to navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});