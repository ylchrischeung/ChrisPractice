import React from 'react';
import Preview from './Preview';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewStatus: false
        };
        this.selectedClick = this.selectedClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
    }
    selectedClick(selected,item){
        this.props.itemData(selected,item);
    }
    cancelClick(canceled,index,item){
        this.props.cancel(canceled,index,item);
    }
    render() {
        let list = this.props.selectedItem;
        let result = list.includes(this.props.product.code);
        const price_object = this.props.product.hasOwnProperty("price") ? this.props.product.price : this.props.product.priceList;
        const price = price_object.hasOwnProperty('formattedValue') ? price_object.formattedValue : 'null';
        return (
            <div className={`product ${result? "red-bgcolor" : "white-bgcolor"}`
                    } >
                <img src={this.props.product.images[0].url} alt="error" />
                <h3>{this.props.product.name}</h3>
                <div className="bt-container">
                    <button onClick={() => {
                        this.setState({
                            previewStatus: !this.state.previewStatus
                        });
                    }} className="preview-bt">{this.state.previewStatus ? 'Preview' : 'Preview'}</button>
                    <button onClick={() => { this.props.detail(this.props.product.images[0].url,this.props.product.code,
                                            price,
                                            this.props.product.description,
                                            //this.props.stock.stockLevelStatus.code
                                            ) }} className="detail">{this.state.detailStatus ? 'cancel' : 'Detail'}</button>
                </div>
                {this.state.previewStatus ?
                    <Preview
                    className=""
                    preview_click={this.state.previewStatus}
                    selected={this.props.selected}
                        cancel={this.props.cancel}
                        a={this.selectedClick}
                        b={this.cancelClick}
                        index={this.props.index}
                        code={this.props.product.code}
                        price={price} />
                    :
                    null}
            </div>
        );
    }
}
export default Product;