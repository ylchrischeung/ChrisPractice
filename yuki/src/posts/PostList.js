import React, { Component } from 'react'
import axios from 'axios';
import styles from './mystyle.module.css'; 

class PostList extends Component{

    constructor() {
        super()
        this.handlePreviewOnClick = this.handlePreviewOnClick.bind(this);
        this.handlePreviewOffClick = this.handlePreviewOffClick.bind(this);

        this.handleDetailsOnClick = this.handleDetailsOnClick.bind(this);
        this.handleDetailsOffClick = this.handleDetailsOffClick.bind(this);

        this.handleSelectOffClick = this.handleSelectOffClick.bind(this);
        this.handleSelectOnClick = this.handleSelectOnClick.bind(this);

        this.handleclickSelect = this.handleclickSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        

        this.state = {
            data : {},
            eventid:[],

            eventid_details:-1,
            back: true,
            select:[],
            showselect: false,

            selectList: []
        };
    }
    
    componentDidMount() {
       
    }

    handleDeselect(){
        this.setState({selectList:[]})
        this.setState({select:[]})
    }
    
    handleSelectOffClick(event, name){
        const id=event.target.id;
        this.setState({select:this.state.select.filter(e=>{
            return e!==+id
        }), selectList:this.state.selectList.concat(name)});
    }

    addToSelectList(name){
        this.setState({selectList:this.state.selectList.concat(name)});
    }

    removeSelectList(name){
        this.setState({selectList:this.state.selectList.filter(e=>{
            return e!=name
        })})
    }
    handleSelectOnClick(event){
        const id=event.target.id;
        this.setState({select:this.state.select.concat(+id)});

    }

    //Preview
    handlePreviewOffClick(event){
        const id=event.target.id;
        this.setState({eventid:this.state.eventid.filter(e=>{
            return e!=+id
        })});
    }

    handlePreviewOnClick(event){
        const id=event.target.id;
        this.setState({eventid:this.state.eventid.concat(+id)});
    }


    handleDetailsOnClick(event){
        const id=event.target.id;
        this.setState({eventid_details:(+id), back:false});
    }

    handleDetailsOffClick(){
        this.setState({eventid_details:-1, back:true});
    }

    handleclickSelect(){
        this.setState(prevState => ({
            showselect: !prevState.showselect
          }));
    }

   
    render() {
        // Logs data
        var self = this;
        const axios = require('axios');
        axios.get('./posts.json')
        .then(function (response) {
            // handle success
            var postdata=response.data;
            console.log(response.data);
            self.setState({data: response.data})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        var showSelect = this.state.showselect;

        if(this.state.data.products == null) 
        return <p>NONE</p>
    
        return(
            
        <div>
            
            <div><button onClick={this.handleclickSelect}>Cart</button></div>
            <p>{showSelect? <div>{ListDisplay(this.state)}
            <button onClick={this.handleDeselect}>Deselect All</button>
            </div>: <div></div>}</p>

            {
                this.state.data.products.map((item,index,array)=>{
                var preview = this.state.eventid.indexOf(index)!=-1;
                var details = this.state.eventid_details!=-1;
                var select = this.state.select.indexOf(index)!=-1;
                var name=item.name;
                {
                   
                    if (details && !this.state.back)
                    {
                        return <div >
                        {
                            this.state.eventid_details===index? <div>
                            <p>{item.name}</p>
                            <p>{item?.price?.formattedValue}</p>
                            <p>{item.images.map((img)=><p><img src = {img.url}></img></p>)}</p>
                            <p>{item.description}</p>
                            <button className={styles.back} onClick={this.handleDetailsOffClick}>Back</button></div>
                            :<div>

                            </div>
                        }
                        
                        </div>
                    }
                    else if (preview)
                    {
                        if(select){
                            return <div className={styles.te}>
                    
                            <p>{item.images.map((img)=><p><img src = {img.url}></img></p>)}</p>
                            <p>{item.name}</p>
                    
                            {preview? 
                            <button id={index} onClick={this.handlePreviewOffClick}>Preview</button>
                            :
                            <button id={index} onClick={this.handlePreviewOnClick}>Preview</button>
                            }
                            
                            <button id={index} className="Details" onClick={this.handleDetailsOnClick}>Details</button>
                            
                            {preview? 
                            <div id={index}><p>{item.code}</p><p>{item?.price?.formattedValue}</p>

                            
                            {select?
                            <button id={index} className="Cancel" onClick={(e)=>{this.handleSelectOffClick(e); this.removeSelectList(item.name);}}>Cancel</button> 
                            
                            :
                            <button id={index} className="Select" onClick = {(e)=>{this.handleSelectOnClick(e); this.addToSelectList(item.name);}}>Select</button>
                            }</div>
                            : 
                            <div id={index}></div>
                            }
                            
                            
                            </div>
                        }
                        else
                        {
                            return <div className={styles.border}>
                            <p>{item.images.map((img)=><p><img src = {img.url}></img></p>)}</p>
                            <p>{item.name}</p>
                    
                            {preview? 
                            <button id={index} onClick={this.handlePreviewOffClick}>Preview</button>
                            :
                            <button id={index} onClick={this.handlePreviewOnClick}>Preview</button>
                            }
                            
                            <button id={index} className="Details" onClick={this.handleDetailsOnClick}>Details</button>
                            
                            {preview? 
                            <div id={index}><p>{item.code}</p><p>{item?.price?.formattedValue}</p>
    

                            {select?
                            <button id={index} className="Cancel" onClick={(e)=>{this.handleSelectOffClick(e); this.removeSelectList(item.name);}}>Cancel</button>
         
                            :
                            <button id={index} className="Select" onClick = {(e)=>{this.handleSelectOnClick(e); this.addToSelectList(item.name);}}>Select</button>
                            }</div>
                            : 
                            <div id={index}></div>
                            }
                            
                            
                            </div>
                        }
                        
                    }
                    else{
                        return <div className={styles.border}>
                        <p>{item.images.map((img)=><p><img src = {img.url}></img></p>)}</p>
                        <p>{item.name}</p>
                   
                        {preview? 
                        <button id={index} onClick={this.handlePreviewOffClick}>Preview</button>
                        :
                        <button id={index} onClick={this.handlePreviewOnClick}>Preview</button>
                        }
                        
                        <button id={index} className="Details" onClick={this.handleDetailsOnClick}>Details</button>
                        
                        
                        
                        </div>
                    }

                    
                    
                }


                

                }
                )
                
                
            }
            
        </div>

        );


     }
}

function ListDisplay(props){
    const groupList = Object.keys(props.selectList).map((key) => {
        return  (
            <div key={key}>
               <div>{props.selectList[key]}</div>
            </div>
        )
    });
 
    return (
      <div>{groupList}</div>
    )
}


export default PostList;
