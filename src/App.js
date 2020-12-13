import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            err: null,
            isLoading: false

        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })

        let api_url = 'https://jsonplaceholder.typicode.com/photos';
        //Using JavaScript's native Fetch API to get photos list from the API
        fetch(api_url)
            .then(res => {
                //fetch doesn't send (404 error) into the cache itself,so i have to send it 
                if (res.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(photos => {
                this.setState({
                    photos,
                    isLoading: false
                })
            },
                err => {
                    this.setState({
                        err,
                        isLoading: false
                    })
                });
    }
    render() {
        // Extract states in the local variable
        let { photos, err, isLoading } = this.state;
        if (err) {
            //  Rendering error message or Error component
            // I have used message
            return (
                <div> { err.message} </div>
            )
        }
        if (isLoading) {
            return (
                <div> Loading... </div>
            )

        }
        return (
            <div>
                {/* Checking whether the photos array contains data or not. */}

                { photos.length > 0 ?

                    <ul>
                        {photos.map(photo => (
                            //<li key={photo.id}>
                            <img src={photo.url} alt="" height="500px" width="400px" />
                            //</li>
                        ))}
                    </ul>

                    : <div> No photo found! </div>}
            </div>
        )
    }
}
export default App;
