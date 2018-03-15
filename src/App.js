import React, {Component} from 'react';
import './App.css';
import {DragDropContext} from 'react-beautiful-dnd';
import TeaserList from "./TeaserList";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class App extends Component {

    state = {
        teasers: {
            draft: [
                {id: 1, title: 'Foo'},
                {id: 2, title: 'Foo2'},
                {id: 3, title: 'Foo3'},
                {id: 4, title: 'Foo4'},
            ],
            published: [],
            archived: [],
        }
    };

    onDragStart = () => {
        console.log('start')
    };
    onDragUpdate = () => {
        console.log('update')
    };
    onDragEnd = (result) => {
        // drop outside of dropping zones
        if (!result.destination) {
            return;
        }

        // dnd does not manage state
        const newTeasers = {};

        if (result.destination.droppableId === result.source.droppableId) {
            // just reshuffle in the same list
            newTeasers[result.destination.droppableId] = reorder(this.state.teasers[result.destination.droppableId], result.source.index, result.destination.index);
            this.setState({teasers: {...this.state.teasers, ...newTeasers}});
        } else {
            // remove from source list, add to destination list
            // MADNESS! this can be done for sure better
            const sourceTeasers = [...this.state.teasers[result.source.droppableId]];
            const destinationTeasers = [...this.state.teasers[result.destination.droppableId]];
            destinationTeasers.splice(result.destination.index, 0, sourceTeasers.filter(t => t.id === result.draggableId)[0]);
            newTeasers[result.destination.droppableId] = destinationTeasers;
            newTeasers[result.source.droppableId] = [...sourceTeasers.slice(0, result.source.index), ...sourceTeasers.slice(result.source.index + 1)];
        }
        this.setState({teasers: {...this.state.teasers, ...newTeasers}});
    };

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <div style={{display: 'flex'}}>
                    <TeaserList teasers={this.state.teasers.draft} status="draft"/>
                    <TeaserList teasers={this.state.teasers.published} status="published"/>
                    <TeaserList teasers={this.state.teasers.archived} status="archived"/>
                </div>
            </DragDropContext>
        );
    }
}

export default App;
