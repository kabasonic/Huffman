angular.module('APP', [])
    .controller('Controller', ControllerFunction);

function ControllerFunction($scope) {
    
    var text;
    var probabilities_array;
    var codes_array;
    var numbers_array;
    var active_signs_array;
    var clicked_sign;
    
    $scope.processData = function() {
        text = $scope.text_data; 
        $scope.text_array = getTextArray(text);
        $scope.text_length = text.length; 
        clicked_sign = null;
        numbers_array = getNumbers(text); 
        probabilities_array = getProbabilities(text); 
        codes_array = getCodes(probabilities_array); 
        
        $scope.sortProperty = 'number'; 
        $scope.reverse = true; 
        
        $scope.encoded_text_array = compressHuffman(text, codes_array);
        
        $scope.setStats(); 
        
        active_signs_array = initClassesArray(text); 

        $scope.probs_codes_array = $scope.buildTable();
    };
    
    $scope.buildTable = function() {
        var array = new Array();
        var table_row;
        for(var sign in codes_array) {
            table_row = new tableRow();
            table_row.sign = sign;
            table_row.number = numbers_array[sign];
            table_row.code = codes_array[sign];
            array.push(table_row);
        }
        return array;
    };
    
    $scope.markSign = function(sign) {
        if(clicked_sign == sign) {
            active_signs_array[sign] = false;
            clicked_sign = null; 
        }
        else { 
            for(var elem in active_signs_array) {
                if(elem == sign) { 
                    active_signs_array[elem] = true;
                }
                else
                    active_signs_array[elem] = false;
            }
            clicked_sign = sign; 
        }
    };
    
    $scope.getClass = function(sign) {
        if(active_signs_array[sign])
            return 'active';
        else 
            return '';
    };
    
    $scope.getRowClass = function(sign) {
        if(active_signs_array[sign])
            return 'active-row';
        else 
            return '';
    }
    
    $scope.getSignClass = function(sign) {
        if(active_signs_array[sign])
            return 'active';
        else 
            return '';
    };
    
    $scope.setStats = function() {
        $scope.entropy = getEntropy(probabilities_array);
        $scope.avg_length = getAverageLength(probabilities_array, codes_array);
        $scope.text_bytes = $scope.text_data.length;
        $scope.text_bits = $scope.text_bytes*8;
        $scope.code_bits = getEncodedData($scope.encoded_text_array).length;
        $scope.code_bytes = Math.ceil($scope.code_bits/8);
        $scope.comp_bits = 100*(($scope.text_bits - $scope.code_bits)/$scope.text_bits);
        $scope.comp_bytes = 100*(($scope.text_bytes - $scope.code_bytes)/$scope.text_bytes);
    };
    
    $scope.sortBy = function(property) {
        $scope.reverse = ($scope.sortProperty === property) ? !$scope.reverse : false;
        $scope.sortProperty = property;
    };
}

