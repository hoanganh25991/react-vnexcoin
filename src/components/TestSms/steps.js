export const getFakeSmsSteps = () => {
  const amount = 20160000

  return [
    {
      title: "NM chuyển tiền cho NTG",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "0909888777",
          receiverNumber: "0909666555",
          msg:
            "So du TK VCB 0501000155042 thay doi +20,160,000 VND luc 26-12-2017 14:44:29. So du 1,778,825,206 VND. Ref MBVCB26105397.01256654629 - 0909333143.CT tu 01810...",
          IMEI: "919632199838707"
        }
      }
    },
    {
      title: "NM chuyển tiền cho NTG lần 2",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "0909888777",
          receiverNumber: "0909666555",
          msg:
            "So du TK VCB 0501000155042 thay doi +20,160,000 VND luc 26-12-2017 14:44:29. So du 1,778,825,206 VND. Ref MBVCB26105397.01256654629 - 0909333143.CT tu 01810...",
          IMEI: "919632199838707"
        }
      }
    },
    {
      title: "NM confirm chuyển xong",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "01256654629",
          receiverNumber: "0909666555",
          msg: "CK XONG 0909333143",
          IMEI: "919632199838707"
        }
      }
    },
    {
      title: "NB chuyển coin cho NM",
      btnLabel: "App do nothing. Next."
    },
    {
      title: "NB yêu cầu nhận tiền từ NTG",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "0909333143",
          receiverNumber: "0909666555",
          msg: "DONE 01256654629 0421000495557",
          IMEI: "919632199838707"
        }
      }
    },
    {
      title: "NM nhận được coin từ NB",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "01256654629",
          receiverNumber: "0909666555",
          msg: "DONE 0909333143",
          IMEI: "919632199838707"
        }
      }
    },
    {
      title: "NTG chuyển tiền cho NB",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "0909888777",
          receiverNumber: "0909666555",
          msg:
            "So du TK VCB 0421000495557 thay doi -20,160,000 VND luc 14-12-2017 16:44:26. So du 854,785,290 VND. Ref MBVCB24289375.TRANSFERRING{{transactionId}}.CT tu 0421000495557 LE THI...",
          IMEI: "919632199838707"
        }
      }
    },
    {
      title: "NTG chuyển tiền xong cho NB",
      reqBody: {
        type: "ENCRYPT_PAYLOAD",
        payload: {
          senderNumber: "0909888777",
          receiverNumber: "0909666555",
          msg:
            "So du TK VCB 0421000495557 thay doi -20,160,000 VND luc 14-12-2017 16:44:26. So du 854,785,290 VND. Ref MBVCB24289375.CKXONG{{transactionId}}.CT tu 0421000495557 LE THI...",
          IMEI: "919632199838707"
        }
      }
    }
  ]
}
