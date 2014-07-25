namespace Proverb.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenameProverbToSaying : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Proverb", newName: "Saying");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.Saying", newName: "Proverb");
        }
    }
}
