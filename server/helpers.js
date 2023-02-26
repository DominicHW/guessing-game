const axios = require("axios");

module.exports = {
    _fetchData: async function () {
        const disneyData = []

        console.log("\nCollecting disney data for first 10 pages");

        for (let i = 1; i < 11; i++) {
            const data = await getPage(i);
            disneyData.push(...data);
        }

        console.log("Finished collecting Disney character data");

        return disneyData;
    }
}

async function getPage(page) {
    const url = `https://api.disneyapi.dev/characters?page=${page}`;

    try {
        const response = await axios.get(url)
        const data = response.data;
        const characterDataSet = data.data;

        let characters = [];

        characterDataSet.forEach(character => {
            const shows = character.films.concat(character.tvShows);

            // Add a character only if they have an image attached and list of shows
            character.imageUrl && shows.length > 0 && characters.push({
                name: character.name,
                imageUrl: character.imageUrl,
                shows
            });
        });

        console.log(`Collected data from page ${page}. Retrieved ${characters.length} characters`);

        return characters;
    } catch (error) {
        console.error(`Error get page ${page} data: ${error}`)
    }
} 