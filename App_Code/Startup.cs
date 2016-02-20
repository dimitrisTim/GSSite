using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GSSite.Startup))]
namespace GSSite
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
