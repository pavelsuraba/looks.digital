export let state = {
    'id': 0,
    'slides': ['home', 'co umíme', 'naše dílna', 'kontakt'],
    'hash': ['home', 'knowledge', 'work', 'contact']
};

export function setState(id) {
    state['id'] = parseInt(id);
    ee.emitEvent('STATE_CHANGED');
};