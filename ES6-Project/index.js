const job = [
    { id: 1, title: true},
    { id: 2, title: true},
    { id: 3, title: false},
    { id: 4, title: false}
];

const activeJob = job.filter(job =>job.title===false);
const newJob = job.map(job =>job.id*2);
const findJob = job.find(job =>job.title===false);

console.log(activeJob);
console.log(newJob);
console.log(findJob);
