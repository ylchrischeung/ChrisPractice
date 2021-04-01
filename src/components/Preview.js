import React from 'react';

class Preview extends React.Component {
    render() {
        return (
            <div className="preview-info">
                <h2 className="code">{this.props.code}</h2>
                <h2 className="price">
                    {
                        this.props.price
                    }</h2>
                <button className="select" onClick={() => this.props.a(this.props.selected,this.props.code)}>Select</button>
                <button className="cancel" onClick={() => this.props.b(this.props.cancel,this.props.index,this.props.code)}>Cancel</button>
            </div>
        );
    }
}
export default Preview;