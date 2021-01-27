<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Team;
use App\Models\Member;
use Exception;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // ログインしているidを基に、ユーザー情報を取得
        $member = Member::with('teams')->find(5);
        // 所属しているチームidを取得
        $teamIds = [];
        for ($i = 0; $i < count($member->teams); $i++) {
            $teamIds[] = $member->teams[$i]->id;
        }
        // 所属しているチームのメンバー一覧を取得
        $teamMembers = Team::with('members')->find($teamIds);
        // 所属しているチームのメッセージ一覧を取得
        $messages = [];
        for ($i = 0; $i < count($teamIds); $i++) {
            $messages[] = DB::table('messages')
                        ->join('members', 'messages.member_id', '=', 'members.id')
                        ->select('messages.*', 'members.name', 'members.member_photo')
                        ->where('messages.team_id', $teamIds[$i])->orderBy('messages.id', 'asc')->get();
        }
        // 所属しているチームのコード一覧を取得
        $techs = [];
        for ($i = 0; $i < count($teamIds); $i++) {
            $techs[] = DB::table('techs')
                        ->join('members', 'techs.member_id', '=', 'members.id')
                        ->select('techs.*', 'members.name', 'members.member_photo')
                        ->where('techs.team_id', $teamIds[$i])->orderBy('techs.id', 'asc')->get();
        }

        return view('team.index', compact('member', 'teamMembers', 'messages', 'techs'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('team.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            // 現在時刻の取得
            $current_date_time = date('Y-m-d H:i:s');

            $team = new Team();
            $team->team_name = $request->input('team_name');
            $team->team_photo = $request->input('team_img');
            $team->created_at = $current_date_time;
            $team->updated_at = $current_date_time;
            $team->save();
            $team->members()->attach(request('member_ids'));
            $team->members()->admin_member_id = null;
            $team->members()->created_at = $current_date_time;
            $team->members()->created_at = $current_date_time;
        } catch(Exception $e) {
            DB::rollBack();
            return back()->withInput();
        }
        DB::commit();
        return redirect('/index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $team = Team::find($id);
        // return view('team.show', compact('team'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $teamMembers = Team::find($id)->members()->get();
        // return view('team.create', compact('teamMembers'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function inputSearch(Request $request)
    {
        if ($request->ajax()) {
            $openTeamId = $request->input('open_team_id');
            $inputMemberId = DB::table('teams')->select('input_member')
                                ->where('id', '=', $openTeamId)->first();
            $inputMemberName = DB::table('members')->select('name')
                                ->where('id', '=', $inputMemberId->input_member)->first();
            return response()->json($inputMemberName);
        }
        // $members = Member::all();
        // return view('team.index', compact('members'));
    }

    public function inputSearchRegister(Request $request)
    {
        $openTeamId = $request->input('open_team_id');
        $openMemberId = $request->input('open_member_id');
        DB::beginTransaction();
        try {
            DB::table('teams')->where('id', $openTeamId)
                            ->update(['input_member' => $openMemberId, 'input_status' => 1]);
        } catch (Exception $e) {
            DB::rollBack();
            // return redirect('/');
        }
        DB::commit();
        $inputMember = Member::with('teams')->find($openTeamId);
        $inputMemberName = $inputMember->name;
        $query = DB::table('teams');
        $inputStatus = $query->select('input_status', 'input_member')->where('teams.id', $openTeamId)->first();
        $result = [$inputMemberName, $inputStatus];
        return response()->json($result);
    }

    public function inputSearchDelete(Request $request)
    {
        $openTeamId = $request->input('open_team_id');
        $openMemberId = $request->input('open_member_id');
        DB::beginTransaction();
        try {
            DB::table('teams')->where('id', $openTeamId)
                            ->update(['input_member' => 0, 'input_status' => 0]);
        } catch (Exception $e) {
            DB::rollBack();
            // return redirect('/');
        }
        DB::commit();
        // $inputMember = Member::with('teams')->find($openTeamId);
        // $inputMemberName = $inputMember->name;
        // $query = DB::table('teams');
        // $inputStatus = $query->select('input_status', 'input_member')->where('teams.id', $openTeamId)->first();
        // $result = [$inputMemberName, $inputStatus];
        return response()->json();
    }
}
