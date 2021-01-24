$(function () {

	// 画像選択時のプレビュー
	$('#icon-img').on('change', function (e) {
		let reader = new FileReader();
		reader.onload = function (e) {
			$('#preview-icon-img').attr('src', e.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	});


	// 検索フォームに入力したら、メンバー検索処理
	$('#member-check-form').on('input', function () {
		let str = $(this).val();
		// 英数字以外が入力されないようにする
		while (str.match(/[^A-Z^a-z\d\-]/)) {
			str = str.replace(/[^A-Z^a-z\d\-]/, "");
		}
		// 入力文字数が10文字になったら、通信を行う
		if ($(this).val().length === 10) {
			const searchStr = $(this).val();
			$('.register-members').css('display', 'block');
			searchMember(searchStr);
		} else {
			$('.register-members-member').remove();
			$('.register-members').css('display', 'none');
		}
	});


	// 該当したメンバーをクリックした時に、メンバー一覧に追加する(クリックした要素の削除も行う)
	$('body').on('click', '.register-members-member', function () {
		if ($(this).children('div').length) {
			const memberId = $(this).children('div').attr('data-member-id');
			const memberName = $(this).children('div').attr('data-member-name');
			const memberPhoto = $(this).children('div').attr('data-member-photo');
			$('.team-member-list').append(buildAddMember(memberId, memberName, memberPhoto));
			$('.register-members').empty();
			$('.register-members').css('display', 'none');
			$('#member-check-form').val('');
		}
	});


	// 入力文字に基づきデータベース検索
	function searchMember(searchStr) {
		$.ajax({
			type: 'GET',
			url: 'member/index',
			data: { 'team_key': searchStr },
			dataType: 'json'
		})
		.done(function (value) {
			// 該当メンバーなし
			if (value.length === 0) {
				$('.register-members').append(buildSearchMember('該当なし'));
				return;
			}
			// 該当メンバーあり
			let registeredMembers = [];
			let registeredMemberLength = $('.team-member-list td').find('input').length;
			for (let i = 0; i < registeredMemberLength; i++) {
				registeredMembers.push($('.team-member-list td').find('input')[i]);
			}
			// チームに登録済みかチェック
			let registeredCheck = true;
			$.each(registeredMembers, function (i, registeredMember) {
				if (registeredMember.defaultValue == value[0].id) {
					registeredCheck = false;
					return false;
				}
			});
			// チームに未登録の場合追加する
			if (registeredCheck) {
				$('.register-members').append(buildSearchMember(value[0]));
			} else {
				$('.register-members').append(buildSearchMember('該当なし'));
			}
		})
		.fail(function () {
			alert('通信失敗');
		});
	}


	// チームメンバー検索結果のHTML生成
	function buildSearchMember(member) {
		// メンバー写真ありの場合
		if (member.member_photo) {
			const html =
				`<li class="register-members-member">
					<img src="images/${member.member_photo}" alt="" class="register-member-img">
					<p class="register-member-name">${member.name}</p>
					<div style="display:none;" data-member-id="${member.id}" data-member-name="${member.name}" data-member-photo="${member.member_photo}"></div>
				</li>`
			return html;
		} else if (member.id) {
			// メンバー写真なしの場合
			const html =
				`<li class="register-members-member">
					<img src="images/no-image.png" alt="" class="register-member-img">
					<p class="register-member-name">${member.name}</p>
					<div style="display:none;" data-member-id="${member.id}" data-member-name="${member.name}" data-member-photo="no-image.png"></div>
				</li>`
			return html;
		} else {
			const html =
				`<li class="register-members-member">
					<img src="images/no-image.png" alt="" class="register-member-img">
					<p class="register-member-name">${member}</p>
				</li>`
			return html;
		}
	};


	// チームメンバー追加のHTML生成
	function buildAddMember(memberId, memberName, memberPhoto) {
		const html =
			`<tr>
				<td>
					<img src="images/${memberPhoto}" alt="" class="register-member-img">
					<p class="register-member-name">${memberName}<input type="hidden" name="member_ids[]" value="${memberId}"></p>
				</td>
			</tr>`
		return html;
	};

});