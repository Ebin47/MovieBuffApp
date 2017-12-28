var app = angular.module('app', []);
app.controller('DashBoard', function ($scope) {
    $scope.Movies = [];
    $scope.MoviesCopy = [];
    $scope.NewMovie = [];
    $scope.NewMovie.lstActorAll = [];
    $scope.NewMovie.lstActor = [];
    $scope.NewMovie.lstProducer = [];
    $scope.NewActor = [];
    $scope.Producers = [];
    $scope.GetMovieData = function () {

        $('.preloader').fadeIn('slow');

        $.ajax({
            url: "../Home/GetMovieData",
            type: "POST",
            dataType:"json",
            success: function (result) {
                $scope.Movies = result;
                $scope.MoviesCopy = angular.copy($scope.Movies);
                $scope.$apply();
                $.ajax({
                    url: "../Home/AllProducersData",
                    type: "POST",
                    dataType: "json",

                    success: function (result) {
                        $scope.Producers = result;
                        $scope.$apply();
                        $('.preloader').fadeOut('slow');
                    },
                    error: function (r) {

                        $('.preloader').fadeOut('slow');
                        toastr.error("Error in getting information. Please refreash page");


                    }
                });
            },
            error: function (r) {
                $('.preloader').fadeOut('slow');
                toastr.error("Error in getting information. Please refreash page");

            }
        });

       
      

    }

    $scope.CancelEdit= function(index)
    {
        $scope.Movies[index] = $scope.MoviesCopy[index];
        $scope.$apply();
    }

    $scope.SaveMovie = function (index) {
        var dataMovie = {};
        dataMovie = { Movie: $scope.Movies[index] };
        $('.preloader').fadeIn('slow');
        $.ajax({
            url: "../Home/SaveMovieData",
            type: "POST",
            dataType: "json",
            data: (dataMovie),
            success: function () {

                $scope.GetMovieData();
                $scope.$apply();
               
                toastr.success("Save success");
            },
            error: function (r) {
               // $scope.GetMovieData();
                $('.preloader').fadeOut('slow');
                if (r.statusText == "OK") {
                    toastr.success("Save success");
                   // $scope.$apply();
                }
                else {
                    toastr.error("Save was not success. Please try again");
                }
                
            }
        });
    }
    $scope.AddNewActor = function (Name,DOB,Gender,Bio)
    {
        var dataActor = { Name: Name, DOB: DOB, Gender: Gender, Bio: Bio };
        $('.preloader').fadeIn('slow');
        $.ajax({
            url: "../Home/SaveNewActorData",
            type: "POST",
            dataType: "json",
            data: (dataActor),
            success: function () {

                $scope.GetAddNewMovieData();
                $scope.$apply();
                $('.ActorModel').removeClass('visible');
                $('.preloader').fadeOut('slow');
                toastr.success("Added Actor");
            },
            error: function (r) {
                $scope.GetAddNewMovieData(); $('.ActorModel').removeClass('visible');
                $('.preloader').fadeOut('slow');
              
            }
        });
    }
    $scope.ShowDailog = function () {
        $('.ActorModel').addClass('visible');
    }
    $scope.ShowDailogProducer = function () {
        $('.ProducerModel').addClass('visible');
    }

    $scope.GetAddNewMovieData = function () {
        $('.preloader').fadeIn('slow');
        $.ajax({
            url: "../Home/AllActorsData",
            type: "POST",
            dataType: "json",
           
            success: function (result) {
                $scope.NewMovie.lstActorAll = result;
                $scope.$apply();
                $('.preloader').fadeOut('slow');
            },
            error: function (r) {

                $('.preloader').fadeOut('slow');
                toastr.error("Error in getting information. Please refreash page");
               
            }
        });


        $('.preloader').fadeIn('slow');
        $.ajax({
            url: "../Home/AllProducersData",
            type: "POST",
            dataType: "json",
           
            success: function (result) {
                $scope.NewMovie.lstProducer = result;
                $scope.$apply();
                $('.preloader').fadeOut('slow');
            },
            error: function (r) {

                $('.preloader').fadeOut('slow');
                toastr.error("Error in getting information. Please refreash page");


            }
        });


        $scope.AddNewProducer = function (Name, DOB, Gender, Bio) {
            var dataActor = { Name: Name, DOB: DOB, Gender: Gender, Bio: Bio };
            $('.preloader').fadeIn('slow');
            $.ajax({
                url: "../Home/SaveProducerData",
                type: "POST",
                dataType: "json",
                data: (dataActor),
                success: function () {

                    $scope.GetAddNewMovieData();
                    $('.ProducerModel').removeClass('visible');
                    $scope.$apply();
                    $('.preloader').fadeOut('slow');
                    toastr.success("Added Producer");
                },
                error: function (r) {
                    $scope.GetAddNewMovieData();
                    $('.ProducerModel').removeClass('visible');
                    $('.preloader').fadeOut('slow');
                   // toastr.error("Adding Producer was not success!! Pleasetry again")
                    
                }
            });

          
        }
    }

    $scope.AddActorToList = function (NewActorToList) {
        var index = -1;

        $scope.NewMovie.lstActor.some(function (obj, i) {
            return obj === NewActorToList.ActorName ? index = i : false;
        });

        if (index == -1) {
            $scope.NewMovie.lstActor.push(NewActorToList.ActorName);
            $scope.$apply();
        }
        else {
            toastr.error("Actor already exist in list");
        }
    }

    $scope.onActorDelete = function (ActorToRemove) {

        var index = -1;

        $scope.NewMovie.lstActor.some(function (obj, i) {
            return obj === ActorToRemove ? index = i : false;
        });

       // var index = $scope.NewMovie.lstActor.index(ActorToRemove);
        if (index > -1) {
            $scope.NewMovie.lstActor.splice(index, 1);
            $scope.$apply();
        }
    }

    $scope.SubmitUpload = function () {
        var form = $('#PosterForm');
        var formData = new FormData(form);
        formData.append('file', $('input[type=file]')[0].files[0]);
        $('.preloader').fadeIn('slow');

        $.ajax({
            url: '../Home/UploadPoster',
            type: 'post',
            data: formData,
            contentType: false, 
            processData: false,
            success: function () {
                $('.preloader').fadeOut('slow');
                toastr.success("Upload success");
            }
        });
    }

    $scope.SaveMovieNewInfo = function () {
        if ($scope.NewMovie.Name != '' && $scope.NewMovie.YOR != '' && $scope.NewMovie.ProducerID != '' && $scope.NewMovie.Name != undefined && $scope.NewMovie.YOR != undefined && $scope.NewMovie.ProducerID != undefined) {
            var MovieData = { Name: $scope.NewMovie.Name, YOR: $scope.NewMovie.YOR, Plot: $scope.NewMovie.Plot, ProducerID: $scope.NewMovie.ProducerID, lstActor: $scope.NewMovie.lstActor };

            $('.preloader').fadeIn('slow');
            $.ajax({
                url: "../Home/SaveNewMovieData",
                type: "POST",
                dataType: "json",
                data: (MovieData),
                success: function () {

                   
                    $('.preloader').fadeOut('slow');
                    window.location.href = "../Home/DashBoard";
                    toastr.success("Movie added successfully")
                },
                error: function (r) {
                    
                    $('.preloader').fadeOut('slow');
                    if (r.statusText == "OK") {
                        $('.preloader').fadeOut('slow');
                        window.location.href = "../Home/DashBoard";
                        toastr.success("Movie added successfully");
                    }
                    else {
                        toastr.error("Unexpected error. Please try again");
                    }

                }
            });
        }
        else {
            toastr.error("Please provide all required information");
        }
    }

   
});

function btnAddNew () {
    window.location.href = "../Home/AddNewMovie";
}
function btnHome() {
    window.location.href = "../Home/DashBoard";
}