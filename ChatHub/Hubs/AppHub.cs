using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatHub.Model;
using Microsoft.AspNetCore.SignalR;

namespace ChatHub.Hubs
{
	public class AppHub : Hub
	{
		private readonly IDictionary<string, User> _connections;
		public AppHub(IDictionary<string, User> connections)
		{
			_connections = connections;
		}

		public Task SendUsersConnected(string room)
		{
			var users = _connections.Values
				.Where(c => c.Room == room)
				.Select(c => c.UserName);

			return Clients.Group(room).SendAsync("UsersInRoom", users);
		}

		public async Task JoinRoom(User user)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, user.Room);
			_connections[Context.ConnectionId] = user;

			await Clients.Group(user.Room).SendAsync("ReceiveMessage", "Hey Everyone !",
			 								$"{user.UserName} has joined {user.Room} !");
			await SendUsersConnected(user.Room);
		}

		public async Task SendMessage(string message)
		{
			if (_connections.TryGetValue(Context.ConnectionId, out User user))
			{
				await Clients.Group(user.Room).SendAsync("ReceiveMessage", user.UserName, message);
			}
		}

		public override Task OnDisconnectedAsync(Exception exception)
		{
			if (_connections.TryGetValue(Context.ConnectionId, out User user))
			{
				_connections.Remove(Context.ConnectionId);
				Clients.Group(user.Room).SendAsync("ReceiveMessage", "Hey Everyone !",
													$"{user.UserName} has left !");
				SendUsersConnected(user.Room);
			}
			return base.OnDisconnectedAsync(exception);
		}
	}
}