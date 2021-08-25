export default function PlayerCard({
    pid, ln, fn, ta, num, pos, pts, reb, ast, stl, headshot, slug, team
}) {
    return(
        <div className="relative overflow-hidden shadow-lg">
            <div className="absolute inset-0">
                <img style={{filter: 'grayscale(1)'}} className="absolute max-h-80 -top-20 -left-20 opacity-20" src={team.logo}/>
                <img className="absolute max-h-10 top-2 right-2 opacity-100 " src={team.logo}/>
            </div>
            <div className="relative">
                <div className="divide-y-4">
                    <div className="relative grid grid-cols-2">
                        <img src={headshot}/>
                        <div className="flex flex-col m-0">
                            <p className="text-gray-400">#{num} | {pos}</p>
                            <h1 className="text-xl font-bold">{fn}</h1>
                            <h1 className="text-xl font-bold">{ln}</h1>
                        </div>
                    </div>
                    <div style={{borderColor: team.color}}>
                        <div className="grid grid-cols-3">
                            <div>
                                <p className="">PPG</p>
                                <p className="text-xl font-bold">{pts}</p>
                            </div>
                            <div>
                                <p className="">RPG</p>
                                <p className="text-xl font-bold">{reb}</p>
                            </div>
                            <div>
                                <p className="">APG</p>
                                <p className="text-xl font-bold">{ast}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
