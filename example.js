const { createStore } = Redux;
var add_counter=0;
var comp_playlist_ptr=null;
let playlist_store = createStore(playlist_functions);
// Action creators
function ac_delete_id(index) {
    return {
        type: 'DELETEID',
        index: index
    }
}
function ac_add_text(text) {
    add_counter+=1;
    return {
        type: 'ADDTEXT',
        text: text+add_counter
    }
}
function playlist_functions(playlist=[], action) {
    switch(action.type) {
    case 'ADDTEXT':
        playlist.push(action.text);
        break;
    case 'DELETEID':
        playlist.splice(action.index,1);
        break;
    }
    return playlist
}
function subscriber() {
    if (comp_playlist_ptr != null) {
        comp_playlist_ptr.forceUpdate();
    }
}

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        comp_playlist_ptr=this;
    }
    render_item(i) {
        return <PlaylistItem title={playlist_store.getState()[i]} clickHandler={()=>playlist_store.dispatch(ac_delete_id(i))} />;
    }
    render() {
        var render_items=Array();
        var playlist_items=playlist_store.getState();
        for (var i=0;i<playlist_items.length;i++) {
            render_items[i]=this.render_item(i);
        }
        return (
            <table>
                {render_items}
            </table>
        );
    }
}
class Adder extends React.Component {
    render() {
        return (
            <button onClick={()=>playlist_store.dispatch(ac_add_text('Item '))}>Add Item</button>
        );
    }
}
class PlaylistItem extends React.Component {
    render() {
        return (
            <tr><td>{this.props.title}</td><td onClick={()=>this.props.clickHandler()}>DEL</td></tr>
        );
    }
}
playlist_store.subscribe(subscriber.bind(playlist_store));
playlist_store.dispatch(ac_add_text("Item "));
playlist_store.dispatch(ac_add_text("Item "));
playlist_store.dispatch(ac_add_text("Item "));
ReactDOM.render(
    <div>
    <Adder />
    <Playlist />
    </div>,
    document.getElementById('root')
);
