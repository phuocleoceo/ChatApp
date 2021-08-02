using System.Collections.Generic;
using ChatHub.Hubs;
using ChatHub.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ChatHub
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}
		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSignalR();

			// CORS
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(builder =>
				{
					builder.AllowAnyOrigin()
						   .AllowAnyHeader()
						   .AllowAnyMethod()
						   .AllowCredentials()
                           .WithOrigins(Configuration.GetSection("ClientURL").Value);;
				});
			});

			// DI
			services.AddSingleton<IDictionary<string, User>>(c => new Dictionary<string, User>());
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();

			app.UseCors();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapHub<AppHub>("/chat");
			});
		}
	}
}
