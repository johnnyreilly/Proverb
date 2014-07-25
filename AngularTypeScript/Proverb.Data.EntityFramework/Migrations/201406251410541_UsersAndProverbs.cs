namespace Proverb.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UsersAndProverbs : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Proverb",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        Text = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 30),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Proverb", "UserId", "dbo.User");
            DropIndex("dbo.Proverb", new[] { "UserId" });
            DropTable("dbo.User");
            DropTable("dbo.Proverb");
        }
    }
}
