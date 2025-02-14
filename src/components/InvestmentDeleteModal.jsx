import { useState } from 'react';
import style from './InvestmentModals.module.css';
import icDelete from '../assets/ic_delete.png';
import eyeOn from '../assets/ic_eye_on.png';
import eyeOff from '../assets/ic_eye_off.png';
import { deleteInvestment, updateInvestment } from '../shared/apis/investmentApis.js';
import InvestmentCompleteModal from './InvestmentCompleteModal.jsx';
import Modal from './Modal.jsx';

const initialValidation = {
	isPasswordOk: false,
	isFirst: true,
};

function InvestmentDeleteModal({ investmentId, onClose, onDelete, show = false }) {
	const [isPWshow, setIsPWshow] = useState(false);
	const [pw, setPw] = useState('');
	const [validation, setValidation] = useState(initialValidation);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPwWrong, setIsPwWrong] = useState(false);

	// NOTE show가 false이면 아무것도 렌더하지 않음
	if (!show) return null;

	const togglePWshow = () => {
		setIsPWshow(!isPWshow);
	};
	const validate = () => {
		const newValidation = { ...initialValidation, isFirst: false };

		if (pw.length !== 0) newValidation.isPasswordOk = true;

		setValidation(newValidation);

		if (!newValidation.isPasswordOk) return false;

		return true;
	};

	const handleDelete = () => {
		// // NOTE validation Check
		if (!validate()) return null;

		const deleteData = async () => {
			const body = { password: pw };

			const investment = await deleteInvestment(investmentId, body);

			if (investment.status === 401) {
				setIsPwWrong(true);
			} else {
				setIsModalOpen(true);
			}
		};
		deleteData();
	};

	return (
		<div id={style.InvestmentDeleteModal}>
			{isModalOpen ? (
				<Modal>
					<InvestmentCompleteModal onClose={() => onDelete()} show />
				</Modal>
			) : (
				<>
					<div id={style.modalHeader}>
						<p>삭제 권한 인증</p>
						<button type="button" onClick={onClose}>
							<img src={icDelete} alt="modalOff" />
						</button>
					</div>

					<form id={style.modalBody}>
						<div id={style.password}>
							<label htmlFor="password">
								비밀번호{' '}
								{!validation.isFirst && !validation.isPasswordOk && (
									<span className={style.errorMsg}>비밀번호를 입력해주세요.</span>
								)}
								{isPwWrong && <span className={style.errorMsg}>비밀번호가 일치하지 않습니다.</span>}
							</label>
							<input
								id="password"
								type={isPWshow ? '' : 'password'}
								placeholder="비밀번호를 입력해 주세요"
								value={pw}
								onChange={e => {
									setPw(e.target.value);
								}}
							/>
							<img id={style.eye} src={isPWshow ? eyeOn : eyeOff} alt="비밀번호 표시" onClick={togglePWshow} />
						</div>
					</form>

					<div id={style.modalFooter}>
						<button type="button" className={style.modal} onClick={handleDelete}>
							삭제하기
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default InvestmentDeleteModal;
