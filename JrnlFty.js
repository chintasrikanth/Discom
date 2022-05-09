//appRoot.factory("detDynamicFty", ['$http', '$q',]);
function DatabaseFty($http, $q) {


    function getData(url, prm) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: url,
            data: prm,//JSON.stringify(prm),
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            deferred.resolve({ success: true, data: JSON.parse(data.d) });
        }).catch(function (response) {
            deferred.resolve({ success: false, data: 'Error from server' });
            // do some basic stuff e.g. hide spinner
            // deferred.reject(error);
        });

        return deferred.promise;

    }

    function getJSON(url) {
        var deferred = $q.defer();
        $http.get(url).success(function (data, status, headers, config) {
            deferred.resolve({ success: true, data: data.d });
        }).catch(function (response) {
            deferred.resolve({ success: false, data: 'Error from server' });
            // do some basic stuff e.g. hide spinner
            // deferred1.reject(error);
        });

        return deferred.promise;

        //$http itself returns a promise, so no need to explicitly create another deferred object
        //return $http.get(url)
        //        .success(function (data) {
        //            //Create deferred object only if you want to manipulate returned data
        //        }).error(function (msg, code) {

        //            console.log(msg, code);
        //        });
    }




    return {

        GetModelByID: function (url, prm) {

            return getData(url, prm);
        }
    }



}

function DynDefaults($http, $q) {
    var DynamicData = {
        //InvTypeList: fnInvTypeList(),
        //CountryList: fnCountryList(),
        //ZoneList: fnZoneList(),
        //StateList: fnStateList(),
        //CityList: fnCityList(),
        //BranchList: fnBranchList(),
        //OccupationList: fnOccupationList()
      
    };
    function getData(url, prm) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: url,
            data: prm,//JSON.stringify(prm),
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data, status, headers, config) {
            deferred.resolve({ success: true, data: JSON.parse(data.d) });
        }).catch(function (response) {
            deferred.resolve({ success: false, data: 'Error from server' });
            // do some basic stuff e.g. hide spinner
            // deferred.reject(error);
        });

        return deferred.promise;

    }

    
    return {
        data: $q.all(DynamicData).then(function (results) { // $q.all also returns a promise

            //console.log('Results', results);
            return { // this will be the resolve value of the returned $q promise
               
                //ZoneList: results.ZoneList,
                //StateList: results.StateList,
                //CityList: results.CityList,
               
            };
        },
        function () {
            alert('an error occured');  // error
        })
    }


}
function StcDefaults() {


    var StaticData = {
        // ApplicationModeList: [{ Id: '0', Name: 'Please Select' }, { Id: '1', Name: 'Express Entry' }, { Id: '2', Name: 'Direct Detailed Entry' }],
      
        DebtCrdtList: [{ Id: '0', Name: 'Please Select' }, { Id: 'D', Name: 'Debit' }, { Id: 'C', Name: 'Credit' }],
       



    };
    return StaticData;
}

