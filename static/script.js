
const tasksJson = document.getElementById('tasks-json').textContent;
const tasks = JSON.parse(tasksJson);


const ctx = document.getElementById('ganttChart').getContext('2d');

const labels = tasks.map(task => task.formule + " (" + task.type + ")");
const startTimes = tasks.map(task => parseInt(task.debut.split(":")[0]) * 60);
const endTimes = tasks.map(task => parseInt(task.fin.split(":")[0]) * 60);
const durations = tasks.map(task => task.duree);

const data = {
    labels: labels,
    datasets: [{
        label: 'Planning',
        data: tasks.map((task, i) => ({
            x: startTimes[i],
            x2: startTimes[i],
            y: i,
        })),
        backgroundColor: tasks.map(task => {
            if (task.type === 'production') return 'rgba(75, 192, 192, 0.6)';
            if (task.type === 'nettoyage') return 'rgba(255, 99, 132, 0.6)';
            return 'rgba(255, 206, 86, 0.6)'; // matière
        }),
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: ctx => `Début: ${ctx.raw.x}min, Durée: ${ctx.raw.x2 - ctx.raw.x}min`
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                min: 0,
                max: 480, // 8h = 480 min
                title: {
                    display: true,
                    text: 'Minute de la journée'
                }
            },
            y: {
                ticks: { autoSkip: false }
            }
        }
    }
};

new Chart(ctx, config);
