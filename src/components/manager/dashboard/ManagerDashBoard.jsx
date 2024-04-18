import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, registerables } from 'chart.js';
import './DashboardStyle.css';

Chart.register(...registerables, CategoryScale, LinearScale, BarController, BarElement);

const ManagerDashboard = () => {
    const [data, setData] = useState({
        coordinators: 0,
        classes: 0,
        courses: 0
    });
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        coordinatorData: {},
        classData: { labels: [], datasets: [{ data: [] }] },
        courseData: { labels: [], datasets: [{ data: [] }] }
    });

    useEffect(() => {
        const fetchMockData = () => {
            // Mock coordinator data
            const mockCoordinatorData = {
                labels: ['North', 'South', 'East', 'West'],
                datasets: [
                    {
                        label: 'Coordinators by Region',
                        data: [12, 19, 3, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)'
                        ]
                    }
                ]
            };

            // Mock class data
            const mockClassData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Classes per Month',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(255, 159, 64, 0.5)'
                    }
                ]
            };

            // Mock course data
            const mockCourseData = {
                labels: ['Computer Science', 'Mathematics', 'Physics', 'Biology'],
                datasets: [
                    {
                        label: 'Courses by Department',
                        data: [15, 10, 8, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)'
                        ]
                    }
                ]
            };

            setChartData({
                coordinatorData: mockCoordinatorData,
                classData: mockClassData,
                courseData: mockCourseData
            });

            setData({
                coordinators: mockCoordinatorData.datasets[0].data.reduce((acc, val) => acc + val, 0),
                classes: mockClassData.datasets[0].data.reduce((acc, val) => acc + val, 0),
                courses: mockCourseData.datasets[0].data.reduce((acc, val) => acc + val, 0)
            });

            setLoading(false);
        };

        fetchMockData();
    }, []);

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="dashboard-container">
            <h2>Manager Dashboard</h2>
            <div className="overview">
                <div className="info-box">
                    <h3>Directors</h3>
                    <p>Total: {data.coordinators}</p>
                </div>
                <div className="info-box">
                    <h3>Classes</h3>
                    <p>Total: {data.classes}</p>
                </div>
                <div className="info-box">
                    <h3>Courses</h3>
                    <p>Total: {data.courses}</p>
                </div>
            </div>

            <div className="charts">
                <div className="chart">
                    <h3>Coordinators by Region</h3>
                    <Pie data={chartData.coordinatorData} />
                </div>
                <div className="chart">
                    <h3>Classes per Month</h3>
                    <Bar data={chartData.classData} />
                </div>
                <div className="chart">
                    <h3>Courses by Department</h3>
                    <Pie data={chartData.courseData} />
                </div>
            </div>
        </div>
    );
}

export default ManagerDashboard;
