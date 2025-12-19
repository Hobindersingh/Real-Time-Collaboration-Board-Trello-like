let data = JSON.parse(localStorage.getItem('board')) || {
todo: [],
progress: [],
done: []
};


function save() {
localStorage.setItem('board', JSON.stringify(data));
}


function addTask(status) {
const text = prompt('Task name');
if (!text) return;
data[status].push(text);
save();
render();
}
function render() {
['todo', 'progress', 'done'].forEach(status => {
const container = document.getElementById(status);
container.innerHTML = '';
data[status].forEach((task, index) => {
const div = document.createElement('div');
div.className = 'task';
div.textContent = task;
div.draggable = true;


div.ondragstart = () => {
div.dataset.from = status;
div.dataset.index = index;
};


container.appendChild(div);
});
});
}
document.querySelectorAll('.task-list').forEach(list => {
list.ondragover = e => e.preventDefault();


list.ondrop = e => {
const task = document.querySelector('.task[draggable=true]');
const from = task.dataset.from;
const index = task.dataset.index;
const to = list.id;


const item = data[from].splice(index, 1)[0];
data[to].push(item);
save();
render();
};
});


render();
