namespace Proverb.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IX_Proverb_UserId : DbMigration
    {
        public override void Up()
        {
            CreateIndex(table: "Proverb", column: "UserId", unique: false, name: "IX_Proverb_UserId");
        }
        
        public override void Down()
        {
            DropIndex(table: "Proverb", name: "IX_Proverb_UserId");
        }
    }
}
