
import teams from './data/teams.json'
export default function handler(req, res) {
        //just to showcase the loading
        setTimeout(()=> res.status(200).json(teams), 1000)
    }