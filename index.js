var express =  require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var game_funcs = require('./game_functions')

//Set up static file folder
app.use(express.static('html'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html')
})

http.listen(3000, function(){
    console.log('Listening on port *:3000')
})

io.on('connection',function(socket){
    socket.on('create_game',function(id){
        console.log(`Created Game ${id}`)
        games[id] = Object.assign({},game_data);
        socket.join(id)

        io.in(id).emit('game_state', games[id])
    })

    socket.on('join_game', function(id){
        if (games[id]){
            if(io.sockets.adapter.rooms[id].length >= 2){
                io.emit('join_failed', id)
            }
            socket.join(id)
            io.in(id).emit('join_success',id)
            io.in(id).emit('game_state', games[id])
        }else{
            io.emit('join_failed',id)
        }
        
    })

    socket.on('send_turn',function(data){
        let id = data.id;
        if (games[id].player_turn === 1){
            games[id][data.turn] = 'x'
        }else{
            games[id][data.turn] = 'o'
        }
        games[id].player_turn = games[id].player_turn === 1 ? 2 : 1

        io.in(id).emit('game_state', games[id])

        let winner = game_funcs.check_game_board(games[id]);
        if (winner){
            io.in(id).emit('winner',winner)
        }
    })
})

//global dictionary to hold games
var games = {}

//dictionary to copy when creating a new game
var game_data = {
    t1 : '',
    t2 : '',
    t3 : '',
    t4 : '',
    t5 : '',
    t6 : '',
    t7 : '',
    t8 : '',
    t9 : '',
    player_turn : 1
}
