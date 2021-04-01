import React from 'react';
import Data from './data.json';
import Product from './components/Product';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_item: [],
      detailStatus: false,
      selectedStatus:false,
      canceled:false,
      detail_index: "",
      detail_des: "",
      detail_price: "",
      detail_stock: "",
      detail_img: "",
    };
    this.passSelect = this.passSelect.bind(this);
    this.clearClick = this.clearClick.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.backClick = this.backClick.bind(this);
    this.getCancel = this.getCancel.bind(this);
  }
  passSelect(selected,item) {
    this.setState({colorReset : false});
    selected = true;
    this.setState({selectedStatus : !selected});
    const item_list = this.state.selected_item;
    let result = item_list.includes(item)
    if(!result && selected ){
      this.setState({ selected_item:  this.state.selected_item.concat(item),
                      });
    }
  }
  getCancel(canceled,index,item){
    const cancel_item = Object.assign([], this.state.selected_item);
    canceled = true;
    const canceled_item = cancel_item.indexOf(item);
    cancel_item.splice(canceled_item,1);
    if(canceled ===true){
      this.setState({selectedStatus:!this.state.selectedStatus,
                  selected_item:cancel_item,
                  canceled : !canceled})}
  }
  clearClick() {
    const delete_item = Object.assign([], this.state.selected_item);
    delete_item.splice(0);
    this.setState({ selected_item: delete_item,
                    selectedStatus: false,
                    colorReset : !this.state.colorReset
                    });
  }
  getDetail(img, code, price, description, status) {
    if(this.state.detailStatus === false){
    this.setState({
        detailStatus: !this.state.detailStatus,
        detail_img: img,
        detail_index: code,
        detail_price: price,
        detail_des: description,
        detail_stock: status
      });
    }
  }
  backClick(detail_status){
    this.setState({detailStatus : !detail_status});
  }
  render() {
    let detail = null;
    if(this.state.detailStatus){
      detail = (
        <div className={`products-detail-container ${this.state.detailStatus?"show_detail":"hide_detail"}`}>
        <h4>Index: {this.state.detail_index}</h4>
        <img src={this.state.detail_img} alt="error" className="image"/>
        <p>{this.state.detail_price}</p>
        <p>{this.state.detail_des}</p>
        <button  onClick={() => this.backClick(this.state.detailStatus)}className="back-bt">Back</button>
      </div>
      );
    }
    return (
        <>
          <header>
            <h1 className="text">Products</h1>
        </header>
          <div className="selected">{this.state.selected_item}
            <button className="clear-bt" onClick={this.clearClick}>clear</button>
          </div>
          <div className="detail-panel ">
            {detail}
          </div>
          <div className="products-container">
            {Data.products.map((product, i) => <Product key={i}
            selectedItem = {this.state.selected_item}
            color={this.state.colorChange}
            colorreset={this.state.colorReset}
              product={product}
              canceled = {this.state.canceled}
              selected={this.state.selectedStatus}
              cancel={this.getCancel}
              index={i+1}
              preview={this.state.previewStatus}
              itemData={this.passSelect} 
              detail={this.getDetail}/>)}
        </div>
        </>
    );
  }
}
export default App;