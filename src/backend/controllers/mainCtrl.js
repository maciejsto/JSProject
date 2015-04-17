function MainCtrl(){

        return {
            
            name: 'mainCtrl',
            
            run: function(app){
                
                app.route('/')
                    .get(function(req, res, next){
                        console.log('insinde main controller');
                        res.render('index',{
                            title: 'Main Page',
                        })
                    });
                    
                    
                app.route('/login')
                    .get(function(req,res,next){
                        res.render('login',{
                            
                        });
                    });    
            }//end run
        }
}

module.exports = MainCtrl;

