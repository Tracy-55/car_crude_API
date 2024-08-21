function carApp() {
    return {
        mostPopularMake: null,
        async fetchMostPopularMake() {
            try {
                const response = await axios.get('http://localhost:3000/api/mostPopularCar');
                this.mostPopularMake = response.data.make;
            } catch (error) {
                console.error('Error fetching most popular make:', error);
            }
        },
        init() {
            this.fetchMostPopularMake();
        }
    };
}
