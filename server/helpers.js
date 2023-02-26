const { Console } = require('console');
const https = require('https');

module.exports = {
    _fetchDisneyData: function () {
        const disneyData = []

        console.log("Fetching first 10 pages of disney data from https://api.disneyapi.dev/characters")

        // Fetch the first 10 pages of data, which is ~500 characters
        for (i = 1; i < 10; i++) {
            https.get(`https://api.disneyapi.dev/characters?page=${i}`, (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    try {
                        console.log("Data chunking finished for page", i);
                        let json = JSON.parse(data);
                        const characterDataSet = json.data;
                        characterDataSet.forEach(character => {
                            const shows = character.films.concat(character.tvShows);

                            // Add a character only if they have an image attached and list of shows
                            character.imageUrl && shows.length > 0 && disneyData.push({
                                name: character.name,
                                imageUrl: character.imageUrl,
                                shows
                            });
                        });
                    } catch (error) {
                        console.error("Error parsing data and converting to JSON:", error.message);
                    };
                });
            }).on("error", (err) => {
                console.error('Error getting Disney character data:', err);
            });
        }

        console.log("Data fetch complete. Disney character data populated");

        return disneyData;
    }
} 