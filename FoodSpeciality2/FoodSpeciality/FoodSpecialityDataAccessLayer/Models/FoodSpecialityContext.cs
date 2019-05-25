using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FoodSpecialityDataAccessLayer.Models
{
    public partial class FoodSpecialityContext : DbContext
    {
        public FoodSpecialityContext()
        {
        }

        public FoodSpecialityContext(DbContextOptions<FoodSpecialityContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Dishes> Dishes { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Payments> Payments { get; set; }
        public virtual DbSet<Ratings> Ratings { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Vendors> Vendors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source =(localdb)\\mssqllocaldb;Initial Catalog=FoodSpeciality;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CatId);

                entity.Property(e => e.CatId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Dishes>(entity =>
            {
                entity.HasKey(e => e.Did);

                entity.Property(e => e.Did)
                    .HasColumnName("DID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CatId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasMaxLength(1);

                entity.Property(e => e.Imagetype)
                    .HasColumnName("imagetype")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Status)
                    .HasColumnName("STATUS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vid)
                    .HasColumnName("VID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Dishes)
                    .HasForeignKey(d => d.CatId)
                    .HasConstraintName("FK__Dishes__CatId__300424B4");

                entity.HasOne(d => d.V)
                    .WithMany(p => p.Dishes)
                    .HasForeignKey(d => d.Vid)
                    .HasConstraintName("FK__Dishes__VID__2F10007B");
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.Oid);

                entity.Property(e => e.Oid)
                    .HasColumnName("OId")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.DelStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Did)
                    .HasColumnName("DID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderTime).HasColumnType("datetime");

                entity.Property(e => e.Uid)
                    .HasColumnName("UID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vid)
                    .HasColumnName("VID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.D)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("orders_did_fk");

                entity.HasOne(d => d.U)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("FK__Orders__UID__32E0915F");

                entity.HasOne(d => d.V)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Vid)
                    .HasConstraintName("FK__Orders__VID__33D4B598");
            });

            modelBuilder.Entity<Payments>(entity =>
            {
                entity.HasKey(e => e.Pid);

                entity.Property(e => e.Pid)
                    .HasColumnName("PID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Destination)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Oid)
                    .HasColumnName("OID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentTime).HasColumnType("datetime");

                entity.Property(e => e.Source)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Uid)
                    .HasColumnName("UID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.O)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Oid)
                    .HasConstraintName("FK__Payments__OID__38996AB5");

                entity.HasOne(d => d.U)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("FK__Payments__UID__37A5467C");
            });

            modelBuilder.Entity<Ratings>(entity =>
            {
                entity.HasKey(e => e.Rid);

                entity.Property(e => e.Rid)
                    .HasColumnName("RID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Comment)
                    .HasColumnName("comment")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Did)
                    .HasColumnName("DID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rating)
                    .HasColumnName("rating")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Uid)
                    .HasColumnName("UID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.D)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("FK__Ratings__DID__5070F446");

                entity.HasOne(d => d.U)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("FK__Ratings__UID__4F7CD00D");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Uid);

                entity.Property(e => e.Uid)
                    .HasColumnName("UID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .HasColumnName("ADDRESS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasColumnName("PHONE")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Query)
                    .HasColumnName("query")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Response)
                    .HasColumnName("response")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('U')");
            });

            modelBuilder.Entity<Vendors>(entity =>
            {
                entity.HasKey(e => e.Vid);

                entity.Property(e => e.Vid)
                    .HasColumnName("VID")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.AccountInfo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .HasColumnName("ADDRESS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasColumnName("PHONE")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Query)
                    .HasColumnName("query")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Response)
                    .HasColumnName("response")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('U')");
            });
        }
    }
}
