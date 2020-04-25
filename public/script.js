const input = document.getElementById('input');
const list = document.getElementById('list');
const data = {
    entries: []
};

class Entry {
    constructor(id, desc) {
        this.id = id;
        this.description = desc;
    }
}

const button = document.getElementById('enter-btn');
button.onclick = addEntry;
document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === 13) {
        addEntry();
    } 
});

function addEntry() {
    if (input.value !== "") {
        let ID, newEntry;

        ID = (data.entries.length > 0) ? data.entries[data.entries.length - 1].id + 1 : 0;
        
        newEntry = new Entry(ID, input.value);
        data.entries.push(newEntry);

        html = `<tr class="entry" id="entry-${ID}"><div class="entry"></div><td class="description">${input.value}</td><td class="delete"><button class="dlt-btn">x</button></td></tr>`;
        list.insertAdjacentHTML('beforeend', html);

        input.value = "";
    }
}

function deleteEntry(id) {
    //model part
    const ids = data.entries.map(c => {
        return c.id;
    });
    index = ids.indexOf(parseInt(id.slice(6)));

    if (index !== -1) {
        data.entries.splice(index, 1);
    }

    //UI part
    const entry = document.getElementById(id);    
    entry.remove();
}

list.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        id = e.target.parentNode.parentNode.id;
        deleteEntry(id);
    }
});