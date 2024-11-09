﻿using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using System;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTO.RequestDTO;
using TaskManagerAPI.Entity;
using TaskManagerAPI.IRepository;

namespace TaskManagerAPI.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly TaskContext _dBContext;

        public AuthenticationRepository(TaskContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<UserSignup> AddUser(UserSignup user)
        {
            var userDetails = await _dBContext.UsersSignups.AddAsync(user);
            await _dBContext.SaveChangesAsync();
            return userDetails.Entity;
        }

        public async Task<UserSignup> GetUserByEmail(string email)
        {
            var user = await _dBContext.UsersSignups.SingleOrDefaultAsync(u => u.Email == email);
            return user!;
        }

        public async Task<UserSignup> Login(LoginRequestDTO request)
        {
            var user = await GetUserByEmail(request.Email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var isLogin = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if (isLogin)
            {
                return user;
            }
            else
            {
                throw new Exception("Invalid password");
            }
        }
    }
}
