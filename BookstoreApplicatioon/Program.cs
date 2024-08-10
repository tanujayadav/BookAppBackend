
using BookstoreApplicatioon.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



var services = builder.Services;

// Add services to the container.








builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:8056", "http://localhost:3000") // Allow requests from specific origin
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders("Cross-Origin-Opener-Policy"));
});

var connectionString = builder.Configuration.GetConnectionString("GasBookingApp");
services.AddDbContext<BookstoreDBContext>(options =>
 options.UseSqlServer(connectionString));

services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowSpecificOrigin");

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
