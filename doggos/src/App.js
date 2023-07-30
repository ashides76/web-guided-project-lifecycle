import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm'

const fetchDog = (breed) => {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
        .then(res => (res))
        .catch(err => console.error(err))
}

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            dogs: [],
            breed: 'husky'
        }
    // fetchDog('husky')
    }
    
    componentDidMount(){
        fetchDog(this.state.breed)
            .then(res => {
                this.setState({
                    // ...dogs,
                    dogs: res.data.message
                })
            })
    }

    searchDog = (dogName) => {
        console.log('search dog')
        fetchDog(dogName)
            .then(res => {
                this.setState({dogs: res.data.message, breed: dogName})
            })

    }
    componentDidUpdate(prevProp, prevState){
        console.log('component did update')
        if (prevState.dogs !== prevState.dogs) {
            console.log('the dogs breed have changed')
            if (this.state.breed === 'maltese') {
                fetchDog('husky').then(res => {
                    this.setState({dogs: res.data.message, breed: 'husky'});
                })
            }
        }


    }

    render(){
        return(
            <>
                <h1>My Application</h1>
                <SearchForm searchDog={this.searchDog}/>
                {this.state.dogs.map((dog, ind) => (
                    <img width={200} height={200} src={dog} key={ind} alt={dog} />
                ))}
            </>
        )
    }
}

export default App;