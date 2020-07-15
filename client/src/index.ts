type ID = number | string;

interface Bookmark {
    id: ID;
    title: string;
    note: string;
    tags: string[];
    quote: string;
    date: Date;
    url: URL;
}


const state = {
    primary: [],
    secondary: []
};

window.addEventListener('DOMContentLoaded', () => {
    renderList('list-primary', state.primary);
});

const getSecondaryList = () => document.getElementById('list-secondary');

function onNoteClicked(id: ID) {
    return function () {
        getSecondaryList().style.display = 'block';
        renderList('list-secondary', state.secondary);
    }
}

function renderList(containerId: string, bookmarks: Bookmark[]) {
    const container = document.getElementById(containerId);
    let child = container.firstChild;
    while (child) {
        container.removeChild(child);
        child = container.firstChild;
    }

    bookmarks.forEach(bookmark => {
        const template = (document.querySelector('#template-list-item-bookmark') as HTMLTemplateElement);
        const fragment = template.content.cloneNode(true) as HTMLElement;

        const note = fragment.querySelector('.note');
        note.textContent = bookmark.note;
        note.addEventListener('click', onNoteClicked(bookmark.id));

        const title = fragment.querySelector('.title') as HTMLAnchorElement;
        title.textContent = bookmark.title;
        title.href = bookmark.url.href;

        fragment.querySelector('.tags').textContent = bookmark.tags.map(t => `[${t}]`).join(' ');

        container.appendChild(fragment);
    });
}