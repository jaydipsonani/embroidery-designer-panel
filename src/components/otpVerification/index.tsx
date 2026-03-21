import styles from './otpVerification.module.scss';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/utils';
import nookies from 'nookies';
import OTPInput from '@/components/modules/otpInput';

const OtpVerification = ({ email }: any) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();
  // const email = router?.query?.email;
  // const otpForEmail = router?.query?.email;
  // const isForgot = router?.query?.isForgot;
  // const oldemail = router?.query?.oldemail;
  // const newemail = router?.query?.newemail;

  const isEmailChange = router?.query?.isemail;
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpLoading, setOtpLoading] = useState(false);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOnSubmitForm = async (e: any) => {
    // e?.preventDefault();
    // setLoading(true);

    // let payload = {
    //   email: email,
    //   email_code: inputValue,
    // };

    // try {
    //   const response =
    //     await getRouteApi({
    //       method: 'POST',
    //       endPoint: 'distributor/authentication/verify-email',
    //       body: payload,
    //     });

    //   if (response?.success) {
    //     nookies.set(
    //       null,
    //       'distributOlyToken',
    //       response?.data?.dist_user?.auth_token,
    //       {
    //         path: '/',
    //         maxAge: 7 * 24 * 60 * 60,
    //       }
    //     );

    //     nookies.set(
    //       null,
    //       'active_status',
    //       response?.data?.dist_user?.active_status,

    //     );
    //     nookies.set(
    //       null,
    //       'user_data',
    //       JSON.stringify({
    //         balance: response?.data?.dist_user?.balance,
    //         company_address: response?.data?.dist_user?.company_address,
    //         company_name: response?.data?.dist_user?.company_name,
    //         email: response?.data?.dist_user?.email,
    //         name: response?.data?.dist_user?.name,
    //         phone_number: response?.data?.dist_user?.phone_number,
    //         // currency: response?.data?.currency,
    //       }),
    //       {
    //         path: '/',
    //         maxAge: 7 * 24 * 60 * 60,
    //       }
    //     );
    //     if (response?.data?.dist_user?.active_status === 1) {
    //       router.push('/');
    //     } else {
    //       router.push('/verification');
    //     }
    //   } else {
    //     throw new Error(response?.message);
    //   }
    // } catch (error: any) {
    //   toastError(error.message);
    // } finally {
    //   setLoading(false);
    // }
    router.push('/');
  };
  const handleResendCode = async () => {
    // setOtpLoading(true);

    // if (email) {
    //   let payload = {
    //     email: email,
    //   };

    //   const resendOtpRes = await getRouteApi({
    //     method: 'POST',
    //     endPoint: 'distributor/authentication/resend-otp',
    //     body: payload,
    //   });

    //   if (resendOtpRes?.success) {
    //     setOtpLoading(false);
    //     resendOtpRes?.message && toastSuccess(resendOtpRes?.message);
    //     setCountdown(60);
    //     setCanResend(false);
    //   } else {
    //     setOtpLoading(false);
    //     resendOtpRes?.message && toastError(resendOtpRes?.message);
    //   }
    // }
  };
  return (
    <div>
      <div className={styles.mainOtpSection}>
        <Container>
          <Row className={styles.optScreenCenter}>
            <Col>
              <div className={styles.formBg}>
                <Row className={styles.otpCenter}>
                  <Col lg={12}>

                    <form onSubmit={(e: any) => handleOnSubmitForm(e)}>
                      <div className={styles.inputotpText}>
                        <OTPInput
                          isNumberInput
                          autoFocus
                          length={6}
                          className={styles.verifyOtpGridAlignments}
                          inputClassName="otpInput"
                          onChangeOTP={(otp: any) => setInputValue(otp)}
                          handleSubmitOTP={(e: any) => {
                            // isForgot
                            //   ? hanleOnResetPaswordOtpVerify(e)
                            //   :
                            handleOnSubmitForm(e);
                          }}
                        />{' '}
                      </div>
                      <div className={styles.resendOtp}>
                        {canResend ? (
                          <>
                            <p className={styles.resendOtpMessage}>
                              Didn’t Receive Code?{'  '}&nbsp;
                              <span
                                className={styles.resendOtpText}
                                onClick={handleResendCode}
                              >
                                {otpLoading ? 'loading..' : 'Resend Code'}
                              </span>
                            </p>
                          </>
                        ) : (
                          <p className={styles.resendOtpMessage}>
                            <span>
                              Resend In{' '}
                              <span className={styles.resendOtpNumber}>
                                0{Math.floor(countdown / 60)}:
                                {(countdown % 60).toString().padStart(2, '00')}
                              </span>
                            </span>
                          </p>
                        )}
                      </div>
                      <div className={styles.otpBtnSection}>
                        <Button type="submit" disabled={loading}>
                          Verify
                        </Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default OtpVerification;
