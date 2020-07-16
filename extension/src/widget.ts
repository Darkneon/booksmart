
import * as stateManager from "./state-management";
import {
    renderHighlight,
    removeHighlight,
    renderPopup,
    removePopup
} from "./ui";
import {Rect} from "./geometry";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:3000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});


export const SAVE_BOOKMARK = gql`
    mutation ($note: String, $title: String, $url: String, $quote: String, $tags: [TagInput]) {
        createBookmark(note: $note, title: $title, url: $url, quote: $quote, tags: $tags) {
            attributes { id }
        }
    }
`;


const state = stateManager.getState();

export function showWidget() {
    const container = renderPopup({ state, onSaved, onCancelled, onMouseDownClicked });
    stateManager.popupRendered(container);
}

function onSaved() {
    client
        .mutate({
            mutation: SAVE_BOOKMARK,
            variables: {
                note: (document.getElementById('note') as HTMLTextAreaElement).value,
                quote: state.selectionText,
                url: window.location.href,
                title: document.title,
                tags: (document.getElementById('tags') as HTMLInputElement).value.split(' ').map(tag => ({name: tag}))
            }
        })
        .then(result => {
            removeHighlight();
            removePopup();
            stateManager.popupRemoved();
        });
}

function onCancelled() {
    removeHighlight();
    removePopup();
    stateManager.popupRemoved();
}

function onMouseDownClicked() {
    if (window.getSelection().rangeCount === 0) {
        return;
    }

    if (!state.hasSelection) {
        const browserClientRects = window.getSelection().getRangeAt(0).getClientRects();
        for (let i = 0; i < browserClientRects.length; i++) {
            renderHighlight(new Rect(browserClientRects.item(i)));
        }

        stateManager.selectionAdded();
    }
}