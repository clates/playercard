export default function PlayerCard({
    pid, ln, fn, ta, num, pos, pts, reb, ast, stl, headshot, slug, team
}) {
    return(
        <div className="relative overflow-hidden shadow-lg">
            <div className="absolute inset-0">
                <img style={{filter: 'grayscale(1)'}} className="absolute h-96 -top-24 -left-10 opacity-5" src={team.logo}/>
                <img className="absolute h-12 top-2 right-2 opacity-100 " src={team.logo}/>
            </div>
            <div className="relative">
                <div className="divide-y-4">
                    <div className="relative grid grid-cols-2 mt-3">
                        <img src={headshot}/>
                        <div className="flex justify-center flex-col m-0">
                            <p className="text-gray-500">#{num} | {pos}</p>
                            <h1 className="text-xl font-extrabold">{fn}</h1>
                            <h1 className="text-xl font-extrabold">{ln}</h1>
                        </div>
                    </div>
                    <div style={{borderColor: team.color}} className="bg-white">
                        <div className="grid grid-flow-col auto-cols-auto text-center divide-x-2">
                            <div className="p-3">
                                <div className="text-lg -mb-1 -mt-1">PPG</div>
                                <div className="text-2xl font-bold">{pts}</div>
                            </div>
                            <div className="p-3">
                                <p className="text-lg -mb-1 -mt-1">RPG</p>
                                <p className="text-2xl font-bold">{reb}</p>
                            </div>
                            <div className="p-3">
                                <p className="text-lg -mb-1 -mt-1">APG</p>
                                <p className="text-2xl font-bold">{ast}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
