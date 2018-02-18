var game_board = [];
var active_game = false;
var player_turn = 1;
var your_player = 1;
var connected = false;

//empty variable to hold the socket when it's created
var socket = io.connect();
var id = null;

//set click handlers
$('#start_game').click(function(){
    id = Math.random().toString(36).substring(7);
    $('#game_id').text(id)
    your_player = 1;
    connected = true;
    socket.emit('create_game',id)
})

$('#join_button').click(function(){
    id = $('#game_id_input').val()
    socket.emit('join_game', id)
    your_player = 2;
    connected = false;
})

$('.tile').click(function(event){
    if(player_turn !== your_player){
        return;
    }

    if (!active_game){
        return;
    }

    var index = event.target.id
    socket.emit('send_turn',{
        id,
        turn : index
    })
})

socket.on('join_failed',function(failed_id){
    if (id === failed_id & !connected){
        alert('Failed to Join')
    }
})

socket.on('join_success',function(new_id){
    if(id === new_id & !connected){
        alert('Joined Room!');
        connected = true;
    }
})

socket.on('game_state',function(game_state){
    console.log(game_state)
    active_game = true;
    for (data in game_state){
        if (data === 'player_turn'){
            player_turn = game_state[data]
            $('#player_number').text(player_turn)
        }else{
            $('#'+data).text(game_state[data])
        }
    }
})

socket.on('winner', function(winner){
    active_game = false;
    alert(`Player ${winner} Wins!`)
})