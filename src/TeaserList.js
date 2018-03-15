import React, {Component} from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';

const listStyles = (isDraggingOver) => {
    return {
        width: 250,
        padding: 10,
        backgroundColor: isDraggingOver ? 'red' : 'gray'
    }
};

const teaserStyles = (isDragging) => {
    return {
        backgroundColor: isDragging ? 'blue' : 'grey',
        transform: isDragging ? "rotate(2deg)" : null
    }
};

class TeaserList extends Component {
    render() {
        return (
            // whole list is wrapped into droppable
            <Droppable droppableId={this.props.status}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={listStyles(snapshot.isDraggingOver)}>
                        {this.props.teasers.map((t, i) =>
                            <Draggable draggableId={t.id} key={t.title} index={i}>
                                {(dragProvided, dragSnapshot) => (
                                    <div>
                                        {/* all these props and refs are needed to turn on drag & drop on element */}
                                        <div ref={dragProvided.innerRef}
                                             {...dragProvided.draggableProps}
                                             {...dragProvided.dragHandleProps}>
                                            <div className="foo"
                                                 style={teaserStyles(dragSnapshot.isDragging)}>
                                                {t.title}
                                            </div>
                                        </div>
                                        {/* this is needed so that list keeps its height */}
                                        {dragProvided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        )}
                        {provided.placeholder}
                    </div>

                )}
            </Droppable>
        )
    }
}

export default TeaserList;