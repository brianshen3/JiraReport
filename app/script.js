const axios = require('axios');
const dotenv = require('dotenv')

dotenv.config();

const JIRA_BASE_URL = 'https://pixlee.atlassian.net/rest/api/2';
const JIRA_USERNAME = process.env.JIRA_USERNAME;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

async function makeRequest() {
    try {
        // Set up the request headers
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`).toString('base64')}`,
        };

        // Set up the request parameters
        const params = {
            jql: 'status = "IN PROGRESS"',
            startAt: 0,
            maxResults: 100,
        };

        // Make the request
        const response = await axios.get(`${JIRA_BASE_URL}/search`, {
            headers,
            params
        });

        // Print the response data
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

makeRequest();