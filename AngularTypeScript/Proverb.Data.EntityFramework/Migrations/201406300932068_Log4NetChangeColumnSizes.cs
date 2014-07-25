namespace Proverb.Data.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Log4NetChangeColumnSizes : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Log4Net", "Thread", c => c.String(maxLength: 10));
            AlterColumn("dbo.Log4Net", "Level", c => c.String(maxLength: 10));
            AlterColumn("dbo.Log4Net", "Logger", c => c.String(maxLength: 100));
            AlterColumn("dbo.Log4Net", "Message", c => c.String(maxLength: 255));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Log4Net", "Message", c => c.String());
            AlterColumn("dbo.Log4Net", "Logger", c => c.String());
            AlterColumn("dbo.Log4Net", "Level", c => c.String());
            AlterColumn("dbo.Log4Net", "Thread", c => c.String());
        }
    }
}
