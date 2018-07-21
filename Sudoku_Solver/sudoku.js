var SolveBtn = document.getElementById("SolveBtn");
SolveBtn.addEventListener("click",Solve);


class Sudoku
{
         constructor()
         {
              this.grid =  new Array(9);
              this.count =  0;
              for(var i=0;i<9;i++)
             {
               this.grid[i] = new Array(9);
             }
         }

          assign()
          {
             for(var i=0 ; i<9 ; i++ )
              {
                 for(var j=0 ; j<9 ; j++)
                 {

                   this.grid[i][j] = document.getElementById( (10*i) + j );
                  }
              }

          }

      
         IsSafe(  num ,  row ,  column )
        {
             if( !this.Used_In_Row( num , row , column ) )
             { 
               if( !this.Used_In_Column( num , row , column ) )
               {
                   if( !this.Used_In_Box( num , row , column ) )
                   return true;
               }

             }
              
             else return false;
        } 

        Find_Unassigned_Location(  _row ,  _column)
        {
          var row = _row[0];
          var column = _column[0];
           for( row=0 ; row<9 ;row++)
           {
              for( column=0 ; column<9 ; column++ )
               {
                   if(  this.grid[row][column].value == "" )
                    {
                       this.count++;
                        _row[0] = row;
                        _column[0] = column;
                        return true;
                    }
                }
           }
           _row[0] = row;
           _column[0] = column;
           return false;
        }

        Used_In_Row( num ,  row , column )
        {

            for( var j=0 ; j<9 ; j++ )
           {
               if( j != column )
               {       
                         if( this.grid[row][j].value == num  )
                       {
                          return true;
                       }
              }

           }
                
           return false;
        }

         Used_In_Column( num , row , column )
       {

             for( var i=0 ; i<9 ; i++ )
             {
                if( i != row ) 
                {       
                  if( this.grid[i][column].value == num  )
                  return true;
                }
             }

          return false;
        }

         Used_In_Box(  num ,  row ,  column )
        {
             var sqn = 3;
             var strw = row - (row%sqn);
             var stcl = column - (column%sqn);

             for( var i=0 ; i<sqn ; i++ )
             {
                 for( var j=0 ; j<sqn ; j++ )
                 {
                      if( strw+i != row && stcl+j != column )
                       {  
                              if( this.grid[ strw+i ][ stcl+j ].value == num )
                              return true;
                       }

                 }
             }

            return false;
        }

        SolveSudoku()
         {
            var _row = [0];
            var _column =[0];
 



            if( !this.Find_Unassigned_Location( _row , _column ) )
            return true;


            for( var num=1 ; num<=9 ; num++ )
             {

                if( this.IsSafe( num , _row , _column ) )
                {
                  this.grid[_row][_column].value = num ;
                  if(  this.count > 90000)
                 {
                    this.count++;
                   return false;
                  }
                

                  if( this.SolveSudoku() )
                  return true;

                  this.grid[_row][_column].value = "";
                }

             }
            return false;     

         }

       CheckSollution()
        {
          
           for( var i=0 ; i<9 ; i++ )
           {
              for( var j=0 ; j<9 ; j++ )
              {
               
                if( !this.IsSafe( this.grid[i][j].value , i , j) ) 
                {
                 // alert(this.grid[i][j].value);
                  //alert(i);
                  //alert(j);
                  return false;
                }
              }

           }
           // alert(this.count);
           return true;

        }

        assign_zero()
        {
            for( var i=0 ; i<9 ; i++)
            {
              for(var j=0 ; j<9 ; j++)
              {
                this.grid[i][j].value = "" ;
              }
            }


        }


}

function sleep (time)
          {
           return new Promise((resolve) => setTimeout(resolve, time));      
          }
function Solve(  ) 
{

var Sudoku1 = new Sudoku();

  Sudoku1.assign();

 if( Sudoku1.SolveSudoku() )
  {  
   // alert(0);
    if(Sudoku1.CheckSollution())
      { 
         sleep(500).then(() => { alert("solved");});
      }
      else
      {
        //Sudoku1.assign_zero();
        alert("Solution doesn't exist");
      }          
  }
 else
 {
    //Sudoku1.assign_zero();
    alert("Solution doesn't exist");
 }
}
