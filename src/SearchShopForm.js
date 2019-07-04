import React, { Component } from 'react';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const ROOT_URL = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
const API_KEY = process.env.REACT_APP_API_KEY


class SearchShopForm extends Component {
  constructor(){
    super()
    this.state={
      radius: "",
      results_array: [],
      current_place: []
    }
    this.onChangeRadius = this.onChangeRadius.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  async componentDidMount(){
    let current_place = []
    await navigator.geolocation.getCurrentPosition(function(position){
      current_place.push(position.coords.latitude)
      current_place.push(position.coords.longitude)
    })
    await this.setState({current_place: current_place})
  }

  async onChangeRadius(e){
    await this.setState({radius: e.target.value })
  }

  async onClick(){
    await axios.get(`${ROOT_URL}?keyid=${API_KEY}&latitude=${this.state.current_place[0]}&longitude=${this.state.current_place[1]}&range=${this.state.radius}&offset_page=1`)
    .then((result) =>{
      console.log(result.data.rest)
    })
  }

  render(){
    return(
      <React.Fragment>
        <div className="center">
          <FormControl className="width200px"> 
            <InputLabel>半径の選択</InputLabel> 
            <Select value={this.state.radius} onChange={this.onChangeRadius} name="radius">
              <MenuItem value="" name="radius">
                <em>選択なし</em>
              </MenuItem>
              <MenuItem name="radius" value={1}>300m</MenuItem>
              <MenuItem name="radius" value={2}>500m</MenuItem>
              <MenuItem name="radius" value={3}>1000m</MenuItem>
              <MenuItem name="radius" value={4}>2000m</MenuItem>
              <MenuItem name="radius" value={5}>3000m</MenuItem>
            </Select>
          </FormControl> 
          <br/>
          <Button style={{ display: this.state.current_place.length !== 0 ? "" : "none",marginTop: "20px" }}onClick={this.onClick} type="submit" variant="contained" color="primary" >
            検索
          </Button>
        </div>
      </React.Fragment>
    )
  }
}


export default SearchShopForm