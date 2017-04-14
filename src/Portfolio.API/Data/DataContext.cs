using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data.Entity;

namespace Portfolio.API.Data
{
    public class DataContext : DbContext
    {

        public DbSet<ContactMessage> ContactMessages { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureContactMessage(modelBuilder);
        }

        protected void ConfigureContactMessage(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ContactMessage>()
                .ToTable("CONTACT_MESSAGE")
                .HasKey(m => m.Id);

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.Id)
                .HasColumnName("ID")
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.CreateDate)
                .HasColumnName("CREATE_DATE")
                .IsRequired()
                .ValueGeneratedOnAddOrUpdate();

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.UpdateDate)
                .HasColumnName("UPDATE_DATE")
                .IsRequired()
                .ValueGeneratedOnAddOrUpdate();

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.Name)
                .HasColumnName("NAME")
                .HasMaxLength(ContactMessage.PropertyNameMaxLength)
                .IsRequired();

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.Email)
                .HasColumnName("EMAIL")
                .HasMaxLength(ContactMessage.PropertyEmailMaxLength)
                .IsRequired();

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.Message)
                .HasColumnName("MESSAGE")
                .HasMaxLength(ContactMessage.PropertyMessageMaxLength)
                .IsRequired();

            modelBuilder.Entity<ContactMessage>()
                .Property(m => m.RemoteAddress)
                .HasColumnName("REMOTE_ADDRESS")
                .HasMaxLength(ContactMessage.PropertyRemoteAddressMaxLength)
                .IsRequired();

        }

    }
}
