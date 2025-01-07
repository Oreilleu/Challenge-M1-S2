<script setup lang="ts">
import { ref, computed } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'
import { TrendingUp, Users, ShoppingCart, ChevronDown } from 'lucide-vue-next'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Types
interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor: string
        backgroundColor: string
        tension: number
        fill: boolean
    }[]
}

interface TimeData {
    daily: {
        labels: string[]
        sales: number[]
        customers: number[]
        basket: number[]
    }
    monthly: {
        labels: string[]
        sales: number[]
        customers: number[]
        basket: number[]
    }
}

// Données étendues
const timeData: TimeData = {
    daily: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        sales: [800, 950, 1200, 1100, 1500, 2000, 1800],
        customers: [20, 25, 30, 28, 35, 45, 40],
        basket: [40, 38, 40, 39, 43, 44, 45]
    },
    monthly: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        sales: [2000, 2500, 3000, 3500, 4000, 4500],
        customers: [50, 60, 70, 80, 90, 100],
        basket: [35, 40, 42, 45, 48, 50]
    }
}

// État
const selectedPeriod = ref<'daily' | 'monthly'>('monthly')
const isDropdownOpen = ref(false)

// Computed values based on selected period
const currentData = computed(() => timeData[selectedPeriod.value])

const totalSales = computed(() =>
    currentData.value.sales.reduce((a, b) => a + b, 0)
)

const totalCustomers = computed(() =>
    currentData.value.customers.reduce((a, b) => a + b, 0)
)

const avgBasket = computed(() =>
    Math.round(currentData.value.basket.reduce((a, b) => a + b, 0) / currentData.value.basket.length)
)

// Chart configurations
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

// Computed chart data
const salesChartData = computed<ChartData>(() => ({
    labels: currentData.value.labels,
    datasets: [{
        label: 'Ventes',
        data: currentData.value.sales,
        borderColor: 'rgb(65, 105, 225)',
        backgroundColor: 'rgba(65, 105, 225, 0.1)',
        tension: 0.4,
        fill: true
    }]
}))

const customersChartData = computed<ChartData>(() => ({
    labels: currentData.value.labels,
    datasets: [{
        label: 'Nouveaux Clients',
        data: currentData.value.customers,
        borderColor: 'rgb(46, 139, 87)',
        backgroundColor: 'rgba(46, 139, 87, 0.1)',
        tension: 0.4,
        fill: true
    }]
}))

const basketChartData = computed<ChartData>(() => ({
    labels: currentData.value.labels,
    datasets: [{
        label: 'Panier Moyen',
        data: currentData.value.basket,
        borderColor: 'rgb(218, 112, 214)',
        backgroundColor: 'rgba(218, 112, 214, 0.1)',
        tension: 0.4,
        fill: true
    }]
}))

const togglePeriod = (period: 'daily' | 'monthly') => {
    selectedPeriod.value = period
    isDropdownOpen.value = false
}
</script>

<template>
    <div class="dashboard">
        <!-- Period Selector -->
        <div class="period-selector">
            <div class="dropdown" @click="isDropdownOpen = !isDropdownOpen">
                <span>{{ selectedPeriod === 'daily' ? 'Vue Journalière' : 'Vue Mensuelle' }}</span>
                <ChevronDown :class="{ 'rotate': isDropdownOpen }" :size="Number('20')" />
                <div class="dropdown-content" v-if="isDropdownOpen">
                    <div @click="togglePeriod('daily')">Vue Journalière</div>
                    <div @click="togglePeriod('monthly')">Vue Mensuelle</div>
                </div>
            </div>
        </div>

        <!-- KPI Cards -->
        <div class="metrics-container">
            <div class="metric-card">
                <div class="metric-icon">
                    <TrendingUp :size="Number('24')" />
                </div>
                <div class="metric-content">
                    <h3>Total des Ventes</h3>
                    <p>{{ totalSales.toLocaleString() }} €</p>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-icon">
                    <Users :size="Number('24')" />
                </div>
                <div class="metric-content">
                    <h3>Total Clients</h3>
                    <p>{{ totalCustomers.toLocaleString() }}</p>
                </div>
            </div>
            <div class="metric-card">
                <div class="metric-icon">
                    <ShoppingCart :size="Number('24')" />
                </div>
                <div class="metric-content">
                    <h3>Panier Moyen</h3>
                    <p>{{ avgBasket }} €</p>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="charts-container">
            <div class="chart-wrapper">
                <h3>Ventes {{ selectedPeriod === 'daily' ? 'Journalières' : 'Mensuelles' }}</h3>
                <Line :data="salesChartData" :options="chartOptions" />
            </div>
            <div class="chart-wrapper">
                <h3>Nouveaux Clients</h3>
                <Line :data="customersChartData" :options="chartOptions" />
            </div>
            <div class="chart-wrapper">
                <h3>Valeur Moyenne du Panier</h3>
                <Line :data="basketChartData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.period-selector {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}

.dropdown {
    position: relative;
    cursor: pointer;
    background: white;
    padding: 10px 15px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
}

.dropdown .rotate {
    transform: rotate(180deg);
    transition: transform 0.2s ease;
}

.dropdown-content {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 5px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 150px;
}

.dropdown-content div {
    padding: 10px 15px;
    transition: background-color 0.2s;
}

.dropdown-content div:hover {
    background-color: #f5f5f5;
}

.metrics-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
}

.metric-icon {
    background: #f5f5f5;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.metric-content {
    flex: 1;
}

.metric-content h3 {
    margin: 0 0 5px 0;
    color: #666;
    font-size: 0.9rem;
}

.metric-content p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.charts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    grid-template-columns: 1fr;
}

.chart-wrapper {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-wrapper h3 {
    margin: 0 0 20px 0;
    color: #666;
    font-size: 1rem;
    text-align: center;
}

@media (min-width: 768px) {
    .charts-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1200px) {
    .charts-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Set a fixed height for the charts */
.chart-wrapper canvas {
    height: 300px !important;
}

/* Responsive adjustments */
@media (max-width: 480px) {
    .dashboard {
        padding: 10px;
    }

    .metric-card {
        padding: 15px;
    }

    .metric-content p {
        font-size: 1.2rem;
    }

    .chart-wrapper canvas {
        height: 250px !important;
    }
}
</style>