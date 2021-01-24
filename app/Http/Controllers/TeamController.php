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
        $messages = Team::with('messages')->find($teamIds);
        // 所属しているチームのコード一覧を取得
        $techs = Team::with('techs')->find($teamIds);

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
        } catch(Exception $e) {
            Db::rollBack();
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
}
