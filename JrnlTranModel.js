
function DataEntity(StcDefaults, DynDefaults, DatabaseFty) {
    var DetDataEntity = DetDataEntity || {}; // namespace
    DetDataEntity.Model = function () {
        this.DebitCreditList = StcDefaults.DebtCrdtList;       
    };
    //DetDataEntity.Model.prototype.constructor = DetDataEntity.Model;    

   
 
    var model = new DetDataEntity.Model();
    return model;

}
function EntityDataModel(StcDefaults, DynDefaults, DatabaseFty) {
    return {

        GetEntityDataModel: function () {
            return DataEntity(StcDefaults, DynDefaults, DatabaseFty);

        }
    }
} 
function SetEntity(model) {
    var JrnlEntity = JrnlEntity || {}; // namespace

    JrnlEntity.Model = function () {
       
        this.ID = model.ID;       
        this.Transaction_ID = model.Transaction_ID;
        this.AMC_Code = model.AMC_Code;//
        this.BranchID = model.BranchID;
        this.Event_Type = model.Event_Type;
        this.Transaction_Date = model.Transaction_Date;
        this.Fund_ID = model.Fund_ID;
        this.AccountName = model.AccountName;
        this.Security_Code = model.Security_Code;
        this.Bank_Account = model.Bank_Account;  
        this.Narration = model.Narration;      
        this.Book_date = model.Book_date;
        this.Instrument_No = model.Instrument_No;
        this.Instrument_Date = model.Instrument_Date;
        this.Record_Type = model.Record_Type;
        this.Inputted_By = model.Inputted_By;
        this.Input_DateTime = model.Input_DateTime;
        this.Authorized_By = model.Authorized_By;
        this.Authorization_DateTime = model.Authorization_DateTime;
        this.NoOfRecords = model.NoOfRecords;
        this.DMLMode = model.DMLMode;
        this.ErrNo = model.ErrNo;
        this.ErrMsg = model.ErrMsg;
        this.PageNumber = model.PageNumber;
        this.PageSize = model.PageSize;
        this.SortBy = model.SortBy;
        this.SortByColumnName = model.SortByColumnName;
        this.PKID = model.PKID;
        this.RecordType = model.RecordType;
        this.VerNo = model.VerNo;
        this.Prospect_Client = model.Prospect_Client;
        this.PlanId = model.PlanId;
        this.PlanRevId = model.PlanRevId;
        this.UserID = model.UserID;
        this.Company_Code = model.Company_Code;
        this.SearchVal = model.SearchVal;
        this.Deci = model.Deci;
        this.SeCurrency = model.SeCurrency;
        this.fCurrency = model.fCurrency;
        this.Prefix = model.Prefix;
        this.maxdate = model.maxdate;
        this.maxdateflag = model.maxdateflag;
        this.Maxdate1 = model.Maxdate1;
        this.JrnlDtlsList = model.JrnlDtlsList
      
    };

    JrnlEntity.Model.prototype.constructor = JrnlEntity.Model;
    var model = new JrnlEntity.Model();
    return model;
}
function Entity() {
    var JrnlEntity = JrnlEntity || {}; // namespace

    JrnlEntity.Model = function () {
        this.ID ="";
        this.Transaction_ID ="";
        this.AMC_Code = $('#hdnCompanyID').val();
        this.BranchID = "";
        this.Event_Type = "JRNL";
        this.Transaction_Date = $('#hdnsysdate').val();
        this.Fund_ID = "";
        this.Security_Code = "";
        this.Bank_Account = "";        
        this.Narration = "";
        this.Srlno ="";
        this.Book_date = $('#hdnsysdate').val();
        this.Instrument_No = "";
        this.Instrument_Date = $('#hdnsysdate').val();
        this.AccountName = "";       
        this.Record_Type = "N";
        this.Inputted_By = "";
        this.Input_DateTime = "";
        this.Authorized_By ="";
        this.Authorization_DateTime = "";
        this.NoOfRecords ="";
        this.DMLMode ="I";
        this.ErrNo = "";
        this.ErrMsg = "";
        this.PageNumber = "";
        this.PageSize = "";
        this.SortBy = "";
        this.SortByColumnName = "";
        this.PKID = "";
        this.RecordType = "";
        this.VerNo ="1";
        this.Prospect_Client = "";
        this.PlanId = "";
        this.PlanRevId = "";
        this.UserID = "";
        this.Company_Code ="";
        this.SearchVal = "";      
        this.fCurrency = "";
        this.Deci = "";
        this.Prefix = "JT";
        this.maxdate = $('#hdnmaxdate').val();
        this.maxdateflag = false;
        this.Maxdate1 = "";
        this.SeCurrency = "";
        this.JrnlDtlsList = [{ "ID": "0", "GL_Account": "", "GL_AccountName": "", "DR_CR": "", "Amount_LCY": "", "Fund_Currency": "INR", "Exchange_Rate": "", "Amount_FCY": "", "CNarration": "", "VerNo": "1", "Record_Type": "N", "CSrlno": "1" }];
    };

    JrnlEntity.Model.prototype.constructor = JrnlEntity.Model;
    var model = new JrnlEntity.Model();
    return model;
} 
function EntityModel() {
    return {

        GetEntityModel: function () {
            return Entity();

        },
        SetEntityModel: function (model) {
            return SetEntity(model);

        }
    }
}